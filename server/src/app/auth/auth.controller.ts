import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleAuthGuard } from './guard/google.guard';
import { AuthorizationGuard } from './guard/authorization.guard';
import { AuthenticationGuard } from './guard/authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signin')
  @UseGuards(AuthenticationGuard)
  async googleAuth(@Req() req: any, @Res() res: any) {
    return this.authService.googleSignin(req, res);
  }

  // @Get('signout')
  // @ApiTags('Auth')
  // signout(@Res() res: Response) {
  //   res.clearCookie('access_token');
  //   console.log('Signout ');
  //   return res.json({
  //     message: 'Signed out successfully',
  //   });
  // }

  @Get('protected')
  @ApiTags('Auth')
  @UseGuards(AuthorizationGuard)
  protected(@Req() req: any) {
    return {
      msg: `Yayy you're logged in`,
      profile: { ...req.profile },
    };
  }
}
