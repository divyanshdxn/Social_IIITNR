import { User } from "../../models/user.model";

export const dbUserToUser = (user: any): User => new User(
    user.user_id,
    user.email,
    user.first_name,
    user.last_name,
    user.photo_url
)