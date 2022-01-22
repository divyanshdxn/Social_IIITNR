import { UploadedFile } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class CreatePostDto {

    @ApiProperty()
    caption: string

    @ApiProperty()
    userId: string
}
