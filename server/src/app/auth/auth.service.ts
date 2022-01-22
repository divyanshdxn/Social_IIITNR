import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) { }

  signup(signupDto: SignupDto) {
    try {
      return this.userService.create(signupDto);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async validateUser(email: string, password: string) {
    const dbUser = await this.userService.findByEmail(email)    
    if (dbUser.passwordHash == password) {
      dbUser.passwordHash = null;
      return dbUser
    }
    return null;
  }


  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email)
    const payload = { id: user.userId, name: user.firstName }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }



}
