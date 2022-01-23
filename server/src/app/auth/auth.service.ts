import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { ProfileService } from '../profile/profile.service';
import { sign } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const profile = this.userService.create({
        email: signupDto.email,
        password: signupDto.password,
        firstName: signupDto.firstName,
        lastName: signupDto.lastName,
        photoUrl: signupDto.photoUrl,
        bio: signupDto.bio,
      });
      return profile;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUser(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }

  async signin(email: string, password: string) {
    const user = await this.profileService.findByEmail(email);
    const payload = { id: user.userId, name: user.firstName };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
