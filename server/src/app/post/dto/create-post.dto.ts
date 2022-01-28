import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  caption: string;

  @ApiProperty()
  pageId?: string;
}
