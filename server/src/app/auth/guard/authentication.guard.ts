import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { envConfig } from 'src/config/env.config';
import { OAuth2Client } from 'google-auth-library';
import { Profile } from 'src/app/profile/entities/profile.entity';
import { ProfileService } from 'src/app/profile/profile.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private profileService: ProfileService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  async validateRequest(request: any): Promise<boolean> {
    const authHeader = request.headers['authorization'];
    if (authHeader) {
      const token = authHeader.substring(7, authHeader.length);
      const profile = await this.verify(token);
      request.profile = profile;
      request.idToken = token;
      return true;
    } else {
      throw new UnauthorizedException('No Authorization headers found!');
    }
  }

  /*
  GENERAL SCHEMA OF THE PAYLOAD RETURNED AFTER VERIFICATION
  {
 // These six fields are included in all Google ID Tokens.
 "iss": "https://accounts.google.com",
 "sub": "110169484474386276334",
 "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
 "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
 "iat": "1433978353",
 "exp": "1433981953",

 // These seven fields are only included when the user has granted the "profile" and
 // "email" OAuth scopes to the application.
 "email": "testuser@gmail.com",
 "email_verified": "true",
 "name" : "Test User",
 "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
 "given_name": "Test",
 "family_name": "User",
 "locale": "en"
}
  */
  async verify(token: string) {
    const client = new OAuth2Client(envConfig.google.cliendId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: [envConfig.google.cliendId, envConfig.google.androidClientId],
      // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const profile: Profile = await this.profileService.createProfile({
      firstName: payload.given_name,
      email: payload.email,
      bio: '',
      lastName: payload.family_name,
      photoUrl: payload.picture,
    });
    return profile;
  }
}
