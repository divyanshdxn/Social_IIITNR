import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiTags("Post")
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() media: Express.Multer.File) {
    return this.postService.create(createPostDto,media);
  }

  @Get()
  @ApiTags("Post")
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiTags("Post")
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags("Post")
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiTags("Post")
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
