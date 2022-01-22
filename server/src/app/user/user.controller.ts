import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @UseGuards(JwtAuthGuard)
  @Get()
  @ApiTags("User")
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiTags("User")
  // @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.findById (id);
  }

}
