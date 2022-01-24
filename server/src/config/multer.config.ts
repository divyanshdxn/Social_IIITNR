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
