import { dbClient } from "../helpers/database/connection";
import { dbUserToUser } from "../helpers/mappers/user.mapper";
import { CreateUserDto, User } from "../models/user.model";


/******************************* CREATE ****************************************/
export const createUser = async (createUserDto: CreateUserDto): Promise<User> => {
    const response = await dbClient.query(
        `
        INSERT INTO user_profile(user_id, email, password_hash, first_name, last_name, photo_url) 
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING user_id, email, first_name,last_name,photo_url
        `,
        [
            createUserDto.userId,
            createUserDto.email,
            createUserDto.passwordHash,
            createUserDto.firstName,
            createUserDto.lastname,
            createUserDto.photoUrl
        ]
    )
    const user = response.rows[0]
    return dbUserToUser(user)
}
/******************************** CREATE ***************************************/




/***************************** READ ******************************************/
export const getAllUsers = async (): Promise<User[]> => {
    const response = await dbClient.query(`SELECT * FROM "user_profile"`)
    return response.rows.map(user => dbUserToUser(user))
}

export const getUserById = async (userId: string): Promise<User> => {
    const response = await dbClient.query(
        `SELECT * FROM user_profile WHERE uuid=$1`,
        [userId]
    )
    return response.rows.map(user => dbUserToUser(user))[0]
}
/******************************** READ ***************************************/




/******************************* DELETE ****************************************/
export const deleteUserById = async (userId: string): Promise<User> => {
    const user = await getUserById(userId)
    const response = await dbClient.query(
        `
        DELETE FROM user_profile 
        WHERE user_id = $1
        RETURNING uuid, email, first_name,last_name,photo_url
        `,
        [userId]
    )
    return user
}
/********************************* DELETE **************************************/