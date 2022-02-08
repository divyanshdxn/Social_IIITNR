import {
  Controller,
  Get,
  Param,
  Delete,
  Res,
  StreamableFile,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MediaService } from './media.service';
import appRoot, { path } from 'app-root-path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get(':mediaId')
  async findOne(@Param('mediaId') mediaId: string, @Res() res: Response) {
    try {
      const media = await this.mediaService.findOne(mediaId);
      res.redirect(media.path);
      // res.set({
      //   'Content-type': media.mimeType,
      // });
      // console.log(path);
      // const file = createReadStream(join(path, media.path));
      // file.on('error', () => {
      //   // throw new Error("Media file not found!")
      //   return res.status(400).json({ message: 'Media not found' });
      // });
      // return file.pipe(res);
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error);
    }
  }

  @Delete(':mediaId')
  remove(@Param('mediaId') mediaId: string) {
    return this.mediaService.remove(mediaId);
  }
}
