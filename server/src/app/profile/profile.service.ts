import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findById(userId: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOneOrFail({ userId });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async findByEmail(email: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOneOrFail({ email });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      console.log('In Create Profile');
      let profile = await this.profileRepository
        .findOneOrFail({
          email: createProfileDto.email,
        })
        .catch((e) => {
          console.log('error in createProfile:', e);
        });
      console.log('Existing Profile:', profile);
      if (!profile) {
        profile = this.profileRepository.create({
          userId: v4(),
          updatedAt: new Date(),
          email: createProfileDto.email,
          firstName: createProfileDto.firstName,
          lastName: createProfileDto.lastName,
          photoUrl: createProfileDto.photoUrl,
          bio: createProfileDto.bio,
        });
      }
      console.log('Profile Created: ', profile);
      return profile.save();
    } catch (err) {
      throw new HttpException(err, 400);
    }
  }

  async remove(userId: string): Promise<Profile[]> {
    const profile = await this.findById(userId);
    return this.profileRepository.remove([profile]);
  }

  update(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(userId, updateProfileDto);
  }

  findAll() {
    return this.profileRepository.find({});
  }
}
