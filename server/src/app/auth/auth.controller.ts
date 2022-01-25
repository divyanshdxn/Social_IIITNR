import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { JwtAuthGuard } from './guard/jwt.guard';
import { LocalAuthGuard } from './guard/local.guard';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('Auth')
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Body() signinDto: SigninDto, @Res() response: Response) {
    const token = await this.authService.signin(
      signinDto.email,
      signinDto.password,
    );
    return response
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true });
  }

  @ApiTags('Auth')
  @Get('signout')
  signout(@Res() res: Response) {
    res.clearCookie('access_token');
    console.log('Signout ');
    return res.json({
      message: 'Signed out successfully',
    });
  }

  @ApiTags('Auth')
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protected() {
    return {
      msg: 'this is a protected route, can only be accessed by logged in user ',
    };
  }
}
