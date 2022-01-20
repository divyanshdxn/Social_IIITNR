import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt"
import { UserService } from 'src/app/user/user.service'

@Injectable()
export class JwtStratagy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            secretOrKey: "mykickasssecret",
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: any) {
        return await this.userService.findById(payload.userId);
    }
}