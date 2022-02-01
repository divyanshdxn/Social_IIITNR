import { PartialType } from '@nestjs/swagger';
import { Page } from '../entities/pages.entity';

export class UpdatePageDto extends PartialType(Page) {}
