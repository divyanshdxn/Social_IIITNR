import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}

  async create(file: Express.Multer.File) {
    try {
      const media = await this.mediaRepository
        .create({
          mediaId: v4(),
          mimeType: file.mimetype,
          path: file.path,
          fileName: file.filename,
          originalName: file.originalname,
        })
        .save();
      return media.mediaId;
    } catch (error) {
      throw error;
    }
  }

  async getMediaFile(mediaId: string) {
    const media = await this.findOne(mediaId);
    return createReadStream(join(process.cwd(), media.path), {});
  }

  findOne(mediaId: string) {
    try {
      return this.mediaRepository.findOneOrFail({ mediaId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(mediaId: string) {
    const media = await this.findOne(mediaId);
    return this.mediaRepository.remove(media);
  }
}
