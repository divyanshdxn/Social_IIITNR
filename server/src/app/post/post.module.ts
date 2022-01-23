import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from '../user/user.module';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports:[ProfileModule,TypeOrmModule.forFeature([Post])]
})
export class PostModule {}
