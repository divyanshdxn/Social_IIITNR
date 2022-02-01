import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { MediaService } from '../media/media.service';
import { PagesService } from '../pages/pages.service';
import { Profile } from '../profile/entities/profile.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) public postRepository: Repository<Post>,
    private mediaService: MediaService,
    private pagesService: PagesService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    profile: Profile,
    file: Express.Multer.File,
  ) {
    try {
      const mediaId = await this.mediaService.create(file);
      const post = this.postRepository.create({
        postId: v4(),
        caption: createPostDto.caption,
        profile: profile,
        media: [mediaId],
      });
      if (createPostDto.pageId)
        post.page = await this.pagesService.findOne(createPostDto.pageId);
      return post.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const posts = await this.postRepository.find({ relations: ['page'] });
      return posts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async findAllByUserId(userId: string) {
    try {
      const posts = await this.postRepository.find({
        profileUserId: userId,
      });
      return posts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async fingById(postId: string) {
    try {
      return await this.postRepository.findOneOrFail(postId, {
        relations: ['page'],
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async update(userId: string, postId: string, updatePostDto: UpdatePostDto) {
    if (this.isOwnedBy(userId, postId)) {
      try {
        const post = await this.fingById(postId);
        post.caption = updatePostDto.caption;
        return await post.save();
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }
    } else {
      throw new UnauthorizedException('This post belongs to other user');
    }
  }

  async remove(userId: string, postId: string) {
    if (this.isOwnedBy(userId, postId)) {
      try {
        const post = await this.fingById(postId);
        return this.postRepository.remove(post);
      } catch (error) {
        console.log(error);
        throw new BadRequestException(error);
      }
    } else {
      throw new UnauthorizedException('This post belongs to other user');
    }
  }

  async isOwnedBy(userId: string, postId: string) {
    try {
      const post = await this.fingById(postId);
      return userId == post.profile.userId;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
