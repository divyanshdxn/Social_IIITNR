import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GoogleAuthGuard } from './guard/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signin')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req:any) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    return this.authService.googleLogin(req, res);
  }

  @Get('signout')
  @ApiTags('Auth')
  signout(@Res() res: Response) {
    res.clearCookie('access_token');
    console.log('Signout ');
    return res.json({
      message: 'Signed out successfully',
    });
  }

  @Get('protected')
  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  protected() {
    return {
      msg: 'this is a protected route, can only be accessed by logged in user ',
    };
  }
}
