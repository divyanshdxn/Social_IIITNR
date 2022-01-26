import { ApiProperty } from '@nestjs/swagger';

export class CreatePageDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
