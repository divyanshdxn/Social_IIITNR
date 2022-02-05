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
import { AuthorizationGuard } from '../auth/guard/authorization.guard';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PagesService } from './pages.service';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @UseGuards(AuthorizationGuard)
  getAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  getOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Get(':id/posts')
  @UseGuards(AuthorizationGuard)
  getPosts(@Param('id') id: string) {
    return this.pagesService.findPosts(id);
  }

  @Post()
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FileInterceptor('file', pageMulterConfig))
  createPage(
    @Body() body: CreatePageDto,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.pagesService.createPage(body, req.profile, file);
  }

  @Patch(':id')
  @UseGuards(AuthorizationGuard)
  updatePage(
    @Param('id') id: string,
    @Body() body: UpdatePageDto,
    @Request() req: any,
  ) {
    return this.pagesService.updatePage(id, body, req.profile);
  }

  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  deletePage(@Param('id') id: string, @Request() req: any) {
    return this.pagesService.deletePage(id, req.profile);
  }
}
