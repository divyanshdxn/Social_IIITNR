import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Profile } from 'src/app/profile/entities/profile.entity';
import { ProfileService } from 'src/app/profile/profile.service';
import { User } from 'src/app/user/entities/user.entity';
import { envConfig } from 'src/config/env.config';
import { JwtPayload } from '../dto/jwt.payload';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
  constructor(private profileService: ProfileService) {
    super({
      secretOrKey: envConfig.jwtSecret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Profile> {
    return await this.profileService.findById(payload.userId);
  }
}
