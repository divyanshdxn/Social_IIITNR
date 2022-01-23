import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt"
import { ProfileService } from 'src/app/profile/profile.service';
import { UserService } from 'src/app/user/user.service'
import { config } from 'src/config/configurations';

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
    constructor(private profileService: ProfileService) {
        super({
            secretOrKey: config.jwtSecret,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any) {
        return await this.profileService.findById(payload.userId);
    }
}