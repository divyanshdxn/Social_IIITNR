import { IsEmail } from "class-validator"

export class CreateProfileDto {

    @IsEmail()
    email:string
    bio:string
    firstName:string
    lastName!:string
    photoUrl:string
}
