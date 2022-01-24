import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Profile } from 'src/app/profile/entities/profile.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Profile> {
    const profile = await this.authService.validateUser(email, password);
    if (!profile) {
      throw new UnauthorizedException('Wrong password');
    }
    return profile;
  }
}
