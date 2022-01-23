import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStratagy } from './stratagy/jwt.stratagy';
import { LocalStrategy } from './stratagy/local.stratagy';
import { config } from 'src/config/configurations';
import { ProfileModule } from '../profile/profile.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStratagy, LocalStrategy],
  imports: [
    UserModule,
    PassportModule,
    ProfileModule,
    JwtModule.register({ secret: config.jwtSecret }),
  ],
})
export class AuthModule {}
