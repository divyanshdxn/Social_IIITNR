import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { postMulterConfig } from 'src/config/multer.config';
import { Profile } from '../profile/entities/profile.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  /* 
  create a post
  with the help of JwtAuthGuard, the received JWT is verified
  if verification succeeds, then the request object gets populated
  with the associated profile, and we can then access the verified
  profile by request.user
  */
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Post')
  @UseInterceptors(FileInterceptor('media', postMulterConfig))
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: any,
    @UploadedFile() media: Express.Multer.File,
  ) {
    const profile: Profile = req.user;
    return this.postService.create(createPostDto, profile, media);
  }

  /* get all posts, only a signed in user can see all the posts */
  @Get()
  @ApiTags('Post')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.postService.findAll();
  }

  /* get a post by its id, only a signed in user can ask for a post */
  @Get(':id')
  @ApiTags('Post')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  /* 
  update a post
  a user can update only those post, which belongs to him
  if not then throw unAuthorized exception - "this post belongs to another user" 
  */ 
  @Patch(':id')
  @ApiTags('Post')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  /* 
  delete a post
  a user can delete only those post, which belongs to him
  if not then throw unAuthorized exception - "this post belongs to another user" 
  */ 
  @Delete(':id')
  @ApiTags('Post')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
