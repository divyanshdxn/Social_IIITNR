import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // get all users-profiles on server
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiTags('Profile')
  findAll() {
    return this.profileService.findAll();
  }

  @Get('get/email')
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  async findByEmail(@Body('email') email: string) {
    return await this.profileService.findByEmail(email);
  }

  // get one user-profile by its userId
  @Get(':id')
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.profileService.findById(id);
  }

  // update the profile of signed in user
  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiTags('Profile')
  update(@Request() req: any, @Body() updateProfileDto: UpdateProfileDto) {
    const profile: Profile = req.user;
    return this.profileService.update(profile.userId, updateProfileDto);
  }

  // delete the profile of signed in user
  @Delete()
  @ApiTags('Profile')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: any) {
    const profile: Profile = req.user;
    return this.profileService.remove(profile.userId);
  }
}
