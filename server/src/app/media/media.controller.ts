import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MediaService } from './media.service';
import appRoot from 'app-root-path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':mediaId')
  async findOne(@Param('mediaId') mediaId: string, @Res() res: Response) {
    const media = await this.mediaService.findOne(mediaId);
    res.set({
      'Content-type': media.mimeType,
    });
    const file = createReadStream(join(media.path));
    return file.pipe(res);
  }

  @Delete(':mediaId')
  remove(@Param('mediaId') mediaId: string) {
    return this.mediaService.remove(mediaId);
  }
}
