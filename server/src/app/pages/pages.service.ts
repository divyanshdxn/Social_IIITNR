import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/pages.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pagesRepository: Repository<Page>,
  ) {}

  findAll(): Promise<Page[]> {
    return this.pagesRepository.find();
  }

  async findOne(id: string): Promise<Page> {
    try {
      return this.pagesRepository.findOneOrFail(id);
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  createPage(createPageDto: CreatePageDto): Promise<Page> {
    const newPage = this.pagesRepository.create(createPageDto);
    console.log(newPage);
    return this.pagesRepository.save(newPage);
  }

  async updatePage(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const updatedPage = await this.findOne(id);
    for (const key in updatePageDto) {
      if (updatePageDto[key]) updatedPage[key] = updatePageDto[key];
    }
    return this.pagesRepository.save(updatedPage);
  }

  async deletePage(id: string): Promise<Page> {
    const page = await this.findOne(id);
    return this.pagesRepository.remove(page);
  }
}
