import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Profile } from 'src/app/profile/entities/profile.entity';
import { ProfileService } from 'src/app/profile/profile.service';
import { envConfig } from 'src/config/env.config';
import { JwtPayload } from '../dto/jwt.payload';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
  constructor(private profileService: ProfileService) {
    super({
      secretOrKey: envConfig.jwtSecret,
      ignoreExpiration: false,
      jwtFromRequest: (req:Request) => req.cookies['access_token'],
    });
  }

  async validate(payload: JwtPayload): Promise<Profile> {
    return await this.profileService.findById(payload.userId);
  }
}
