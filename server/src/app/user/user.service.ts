import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const profile = await this.profileService.createProfile({
        email: createUserDto.email,
        photoUrl: createUserDto.photoUrl,
        bio: createUserDto.bio,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });
      const user = this.userRepository.create({
        profile: profile,
        email: profile.email,
        passwordHash: createUserDto.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await user.save();
      return profile;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }

  async validateUser(email: string, password: string): Promise<Profile> {
    try {
      const user = await this.userRepository.findOneOrFail({ email });
      if (password == user.passwordHash) {
        return await this.profileService.findByEmail(email);
      }
      return null;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  changePassword(email: string, password: string) {
    return `This action updates a #${email} user`;
  }
}
