import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { PostModule } from './app/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './app/profile/profile.module';
import { MediaModule } from './app/media/media.module';
import { PagesModule } from './app/pages/pages.module';
import ORMConfig from 'ormconfig';
import { EventsModule } from './app/events/events.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    EventsModule,
    TypeOrmModule.forRoot(ORMConfig),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [],
    }),
    //ServeStaticModule.forRoot({
    //rootPath: join(__dirname, '..', '..', 'client/build'),
    //}),
    ProfileModule,
    MediaModule,
    PagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
