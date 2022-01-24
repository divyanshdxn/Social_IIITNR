import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { MediaService } from '../media/media.service';
import { Profile } from '../profile/entities/profile.entity';
import { ProfileService } from '../profile/profile.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) public postRepository: Repository<Post>,
    private mediaService: MediaService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    profile: Profile,
    file: Express.Multer.File,
  ) {
    try {
      const mediaId = await this.mediaService.create(file);
      const post = await this.postRepository
        .create({
          postId: v4(),
          caption: createPostDto.caption,
          profile: profile,
          media: [mediaId],
        })
        .save();
      return post;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const posts = await this.postRepository.find({});
      return posts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
