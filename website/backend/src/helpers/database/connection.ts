import { Client, Pool } from "pg"
import { initDB } from "./initialize"

// const dbUrl = process.env.DATABASE_URL || "postgres://postgres:231223@localhost:5432/social_iiitnr"

export const dbClient = new Pool({
    user:"postgres",
    password:"231223",
    host:"localhost",
    port:5432,
    database:"social_iiitnr"  
})

export const connectDB = async () => {
    try {
        await dbClient.connect()
        await initDB();
        console.log("DATABASE CONNECTED");
    } catch (error) {
        console.log("DATABASE CONNECTION FAILURE", error);
    }
}