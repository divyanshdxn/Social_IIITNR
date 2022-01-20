import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { UserService } from '../user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    private userService: UserService,
    @InjectRepository(Post) public postRepository: Repository<Post>) { }

  async create(createPostDto: CreatePostDto,media:Express.Multer.File) {
    try {
      const user = await this.userService.findById(createPostDto.userId)
      const post = this.postRepository.create({
        postId: v4(),
        caption: createPostDto.caption,
        media: media.buffer,
        mimeType:media.mimetype,
        createdAt: (new Date()),
        updatedAt: (new Date()),
        user: user
      })
      return post;
    } catch (error) {
       throw new InternalServerErrorException(error)
    }
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
