import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from '../media/media.module';
import { Page } from './entities/pages.entity';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  imports: [TypeOrmModule.forFeature([Page]), MediaModule],
  exports: [PagesService],
})
export class PagesModule {}
