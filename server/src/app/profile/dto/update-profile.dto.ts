import { PartialType } from '@nestjs/swagger';
import { Post } from 'src/app/post/entities/post.entity';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
