import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Media } from './entities/media.entity';
import { storage } from 'src/config/firebase.config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media) private mediaRepository: Repository<Media>,
  ) {}

  // async create(file: Express.Multer.File) {
  //   try {
  //     const metadata = {
  //       contentType: file.mimetype,
  //     };
  //     const fileRef = ref(storage, `posts/images/IMG${v4().replace('-', '')}`);
  //     await uploadBytes(fileRef, file.buffer, metadata);
  //     const url = await getDownloadURL(fileRef);
  //     const media = await this.mediaRepository
  //       .create({
  //         mediaId: v4(),
  //         mimeType: file.mimetype,
  //         path: url,
  //         fileName: file.originalname,
  //         originalName: file.originalname,
  //       })
  //       .save();
  //     return media.mediaId;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async create(file: Express.Multer.File): Promise<string> {
    try {
      const metadata = {
        contentType: file.mimetype,
      };
      const fileRef = ref(storage, `posts/images/IMG${v4().replace('-', '')}`);
      await uploadBytes(fileRef, file.buffer, metadata);
      const url = await getDownloadURL(fileRef);
      console.log(url);
      return url;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
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
