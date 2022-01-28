import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}
  async create(page_id: string, createEventDto: CreateEventDto, user: Profile) {
    const parentPage = await this.pagesService.findOneAndJoin(page_id);
    if (!parentPage) throw new NotFoundException();
    try {
      const event = this.eventRepository.create(createEventDto);
      event.page = parentPage;
      await this.eventRepository.save(event);
      parentPage.events.push(event);
      parentPage.save();
      const { page, ...rest } = event;
      return rest;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  findAll(page_id: string) {
    return this.eventRepository.find({
      where: {
        page: {
          id: page_id,
        },
      },
    });
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
      throw new NotFoundException(err);
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto, user: Profile) {
    const event = await this.eventRepository.findOne(id);
    for (const key in updateEventDto) {
      if (updateEventDto[key]) event[key] = updateEventDto[key];
    }
    return event.save();
  }

  async remove(id: string, user: Profile) {
    const event = await this.eventRepository.findOne(id);
    return event.remove();
  }

  findOneAndJoin(event_id: string) {
    try {
      return this.eventRepository.findOneOrFail(event_id, {
        relations: ['page'],
      });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
  findAllAndJoin(page_id: string) {
    return this.eventRepository.find({
      relations: ['page'],
      where: { page: { id: page_id } },
    });
  }
}
