import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isString } from 'class-validator';
import { Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { Post } from '../post/entities/post.entity';
import { Profile } from '../profile/entities/profile.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/pages.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pagesRepository: Repository<Page>,
    private mediaService: MediaService,
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

  async findPosts(id: string): Promise<Post[]> {
    try {
      const page = await this.pagesRepository.findOneOrFail(id, {
        relations: ['posts'],
      });
      return page.posts;
    } catch (err) {
      throw new NotFoundException('Page you requested was not found');
    }
  }

  async createPage(
    createPageDto: CreatePageDto,
    profile: Profile,
    file: Express.Multer.File,
  ) {
    console.log(profile);
    const newPage = this.pagesRepository.create(createPageDto);
    const media = await this.mediaService.create(file);
    newPage.admins = [profile];
    newPage.media = [media];
    await newPage.save();
    profile.adminOfPages = [newPage];
    await profile.save();
    const { admins, ...rest } = newPage;
    return rest;
  }

  async updatePage(
    id: string,
    updatePageDto: UpdatePageDto,
    admin: Profile,
  ): Promise<Page> {
    const updatedPage = await this.findOneAndJoin(id);
    if (!(await this.checkPermissions(updatedPage, admin)))
      throw new UnauthorizedException();
    for (const key in updatePageDto) {
      if (updatePageDto[key]) updatedPage[key] = updatePageDto[key];
    }
    return this.pagesRepository.save(updatedPage);
  }

  async findOneAndJoin(page_id: string): Promise<Page> {
    try {
      return await this.pagesRepository.findOne(page_id, {
        relations: ['admins', 'events'],
      });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async checkPermissions(page: string | Page, user: Profile): Promise<boolean> {
    let authorized = false;
    if (isString(page)) page = await this.findOneAndJoin(page);
    if (!isString(page))
      page.admins.forEach((curr) => {
        if (curr.userId === user.userId) {
          authorized = true;
          return false;
        }
      });
    return authorized;
  }

  async deletePage(id: string, user: Profile): Promise<Page> {
    const page = await this.findOneAndJoin(id);
    if (!(await this.checkPermissions(page, user)))
      throw new UnauthorizedException();
    return this.pagesRepository.remove(page);
  }

  async addAdmin(id: string, user: Profile): Promise<Page> {
    const page = await this.findOneAndJoin(id);
    if (!(await this.checkPermissions(page, user)))
      throw new UnauthorizedException();
    page.admins.push(user);
    return page.save();
  }

  async removeAdmin(id: string, user: Profile): Promise<Page> {
    const page = await this.findOneAndJoin(id);
    if (!(await this.checkPermissions(page, user)))
      throw new UnauthorizedException();
    page.admins.filter((curr) => curr.userId != user.userId);
    return page.save();
  }
}
