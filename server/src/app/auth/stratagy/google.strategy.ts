import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { Profile } from 'src/app/profile/entities/profile.entity';
import { ProfileService } from 'src/app/profile/profile.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private profileService: ProfileService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    user: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = user;
    const profile: Profile = await this.profileService.createProfile({
      firstName: name.givenName,
      email: emails[0].value,
      bio: '',
      lastName: name.familyName,
      photoUrl: photos[0].value,
    });
    return {
      accessToken,
      profile,
    };
  }
}
