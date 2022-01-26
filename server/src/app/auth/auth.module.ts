import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratagy } from './stratagy/jwt.stratagy';
import { LocalStrategy } from './stratagy/local.stratagy';
import { envConfig } from 'src/config/env.config';
import { ProfileModule } from '../profile/profile.module';
import { env } from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy, LocalStrategy],
  imports: [
    UserModule,
    PassportModule,
    ProfileModule,
    JwtModule.register({
      secret: envConfig.jwtSecret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
