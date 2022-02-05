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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { eventMulterConfig } from 'src/config/multer.config';
import { AuthorizationGuard } from '../auth/guard/authorization.guard';

@ApiTags('Events')
@Controller('pages/:page_id/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @UseInterceptors(FileInterceptor('file', eventMulterConfig))
  create(
    @Param('page_id') pages_id: string,
    @Body() createEventDto: CreateEventDto,
    @Request() req: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.eventsService.create(pages_id, createEventDto, req.user, file);
  }

  @Get()
  @UseGuards(AuthorizationGuard)
  findAll(@Param('page_id') pages_id: string) {
    return this.eventsService.findAll(pages_id);
  }

  @Get('rel')
  @UseGuards(AuthorizationGuard)
  findAllAndJoin(@Param('page_id') pages_id: string) {
    return this.eventsService.findAllAndJoin(pages_id);
  }

  @Get(':id')
  @UseGuards(AuthorizationGuard)
  findOne(@Param('page_id') pages_id: string, @Param('id') id: string) {
    return this.eventsService.findOne(id, pages_id);
  }
  @Get(':id/rel')
  @UseGuards(AuthorizationGuard)
  findOneAndJoin(@Param('id') id: string, @Param('page_id') pages_id: string) {
    return this.eventsService.findOneAndJoin(id, pages_id);
  }

  @Patch(':id')
  @UseGuards(AuthorizationGuard)
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: any,
    @Param('page_id') pages_id: string,
  ) {
    return this.eventsService.update(id, pages_id, updateEventDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthorizationGuard)
  remove(
    @Param('id') id: string,
    @Param('page_id') pages_id: string,
    @Request() req: any,
  ) {
    return this.eventsService.remove(id, pages_id, req.user);
  }
}
