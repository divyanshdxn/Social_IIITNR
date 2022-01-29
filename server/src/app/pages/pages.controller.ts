import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { pageMulterConfig } from 'src/config/multer.config';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './pages.service';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Get(':id/posts')
  @UseGuards(JwtAuthGuard)
  getPosts(@Param('id') id: string) {
    return this.pagesService.findPosts(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', pageMulterConfig))
  createPage(
    @Body() body: CreatePageDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.pagesService.createPage(body, req.user, file);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updatePage(
    @Param('id') id: string,
    @Body() body: UpdatePageDto,
    @Request() req: any,
  ) {
    return this.pagesService.updatePage(id, body, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePage(@Param('id') id: string, @Request() req: any) {
    return this.pagesService.deletePage(id, req.user);
  }
}
