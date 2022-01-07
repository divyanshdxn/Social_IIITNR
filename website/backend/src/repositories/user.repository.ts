import { dbClient } from "../helpers/db.helper";
import { CreateUserDto, User } from "../models/user.model";


export const createUser = async (createUserDto: CreateUserDto) => {
    const response = await dbClient.query(
        `INSERT INTO user_profile(uuid, email, password_hash, first_name, last_name, photo_url) 
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING uuid, email, first_name,last_name,photo_url
        `,
        [createUserDto.uuid, createUserDto.email,createUserDto.passwordHash, createUserDto.firstName, createUserDto.lastname, createUserDto.photoUrl]
    )
    const user = response.rows[0]
    return new User(user.uuid,user.email, user.first_name, user.last_name, user.photo_url)
}


export const getAllUsers = async (): Promise<User[]> => {
    const response = await dbClient.query(`SELECT * FROM "user_profile"`)
    return response.rows.map(user => new User(user.uuid, user.email,user.first_name, user.last_name, user.photo_url))
}

export const getUserById = async (id: string) => {
    const response = await dbClient.query(
        `SELECT * FROM user_profile WHERE uuid=$1`,
        [id]
    )
    return response.rows.map(user => new User(user.uuid, user.email,user.first_name, user.last_name,user.photo_url))
}

