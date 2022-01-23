import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Post } from '../post/entities/post.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async findById(userId: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ userId });
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const profile = this.profileRepository.create({
        userId: v4(),
        updatedAt: new Date(),
        email: createProfileDto.email,
        firstName: createProfileDto.firstName,
        lastName: createProfileDto.lastName,
        photoUrl: createProfileDto.photoUrl,
        bio: createProfileDto.bio,
      });
      await profile.save();
      return profile;
    } catch (err) {
      throw err;
    }
  }

  remove(userId: string) {}
  update(userId: string, updateProfileDto: UpdateProfileDto) {}
  findAll() {
    return this.profileRepository.find({});
  }
}
