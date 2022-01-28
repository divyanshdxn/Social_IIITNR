import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaService } from '../media/media.service';
import { PagesService } from '../pages/pages.service';
import { Profile } from '../profile/entities/profile.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventDetails } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventDetails)
    private eventRepository: Repository<EventDetails>,
    private pagesService: PagesService,
    private mediaService: MediaService,
  ) {}
  async create(
    page_id: string,
    createEventDto: CreateEventDto,
    user: Profile,
    file: Express.Multer.File,
  ) {
    const parentPage = await this.pagesService.findOneAndJoin(page_id);
    const mediaId = await this.mediaService.create(file);
    if (!(await this.pagesService.checkPermissions(parentPage, user)))
      throw new UnauthorizedException();
    if (!parentPage) throw new NotFoundException();
    try {
      const event = this.eventRepository.create(createEventDto);
      event.page = parentPage;
      event.media = [mediaId];
      await this.eventRepository.save(event);
      parentPage.events.push(event);
      parentPage.save();
      const { page, ...rest } = event;
      return rest;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  findAll(page_id: string) {
    try {
      return this.eventRepository.find({
        where: {
          page: {
            id: page_id,
          },
        },
      });
    } catch (err) {
      this.notFound();
    }
  }

  findOne(id: string, page_id: string) {
    try {
      return this.eventRepository.findOneOrFail(id, {
        where: {
          page: {
            id: page_id,
          },
        },
      });
    } catch (err) {
      this.notFound();
    }
  }

  async update(
    id: string,
    page_id: string,
    updateEventDto: UpdateEventDto,
    user: Profile,
  ) {
    const event = await this.findOneAndJoin(id, page_id);
    console.log(event);
    if (!(await this.pagesService.checkPermissions(event.page, user)))
      throw new UnauthorizedException();
    for (const key in updateEventDto) {
      if (updateEventDto[key]) event[key] = updateEventDto[key];
    }
    return event.save();
  }

  async remove(id: string, page_id: string, user: Profile) {
    const event = await this.findOneAndJoin(id, page_id);
    if (!(await this.pagesService.checkPermissions(event.page, user)))
      throw new UnauthorizedException();
    return event.remove();
  }

  findOneAndJoin(event_id: string, page_id: string) {
    try {
      return this.eventRepository.findOneOrFail(event_id, {
        relations: ['page', 'page.admins'],
        where: { page: { id: page_id } },
      });
    } catch (err) {
      this.notFound();
    }
  }

  notFound() {
    throw new NotFoundException("Requested Page Or Event Doesn't Exist");
  }

  findAllAndJoin(page_id: string) {
    return this.eventRepository.find({
      relations: ['page', 'page.admins'],
      where: { page: { id: page_id } },
    });
  }
}
