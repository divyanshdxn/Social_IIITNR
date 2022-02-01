import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';
import { MediaModule } from '../media/media.module';
import { PagesModule } from '../pages/pages.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    ProfileModule,
    TypeOrmModule.forFeature([Post]),
    MediaModule,
    PagesModule,
  ],
})
export class PostModule {}
