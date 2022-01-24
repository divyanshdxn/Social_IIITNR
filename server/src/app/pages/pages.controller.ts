import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/pages.entity';
import { PagesService } from './pages.service';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}
  @Get()
  getAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Post()
  createPage(@Body() body: CreatePageDto) {
    return this.pagesService.createPage(body);
  }

  @Patch(':id')
  updatePage(@Param('id') id: string, @Body() body: UpdatePageDto) {
    return this.pagesService.updatePage(id, body);
  }

  @Delete(':id')
  deletePage(@Param('id') id: string) {
    return this.pagesService.deletePage(id);
  }
}
