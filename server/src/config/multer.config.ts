import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const postMulterConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/post',
  }),
  limits: {
    fileSize: 1000000,
  },
};

export const eventMulterConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/event',
  }),
  limits: {
    fileSize: 1000000,
  },
};

export const pageMulterConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/page',
  }),
  limits: {
    fileSize: 1000000,
  },
};
