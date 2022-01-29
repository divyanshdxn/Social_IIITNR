import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  desc?: string;

  @ApiProperty()
  deadline?: Date;
}
