import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class SigninDto {

    @ApiProperty({ format: "email" })
    @IsEmail()
    email: string

    @ApiProperty({ format: "string" })
    @IsNotEmpty()
    password: string

}