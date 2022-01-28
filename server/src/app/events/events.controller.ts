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
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('pages/:page_id/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('page_id') pages_id: string,
    @Body() createEventDto: CreateEventDto,
    @Request() req: any,
  ) {
    return this.eventsService.create(pages_id, createEventDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('rel')
  @UseGuards(JwtAuthGuard)
  findAllAndJoin() {
    return this.eventsService.findAllAndJoin();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
  @Get(':id/rel')
  @UseGuards(JwtAuthGuard)
  findOneAndJoin(@Param('id') id: string) {
    return this.eventsService.findOneAndJoin(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: any,
  ) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req: any) {
    return this.eventsService.remove(id);
  }
}
