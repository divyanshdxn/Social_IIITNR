import { Client } from "pg"

const dbUrl = process.env.DATABASE_URL || "postgres://postgres:231223@localhost:5432/social_iiitnr"

export const dbClient = new Client(dbUrl)

export const connectDB = async () => {
    try {
        await dbClient.connect()
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILURE", error);
    }
}