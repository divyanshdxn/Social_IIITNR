import { GetUserDto } from "./dto/get-user.dto";
import { User } from "./entities/user.entity";

export const usetToGetUserDto = (user: User) => new GetUserDto(user.email, user.firstName, user.lastName, user.photoUrl)