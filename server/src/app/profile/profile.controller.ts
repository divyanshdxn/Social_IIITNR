import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiTags('Profile')
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.profileService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Profile')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
