import express, { Application, Response, Request, response } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from "./helpers/db.helper";
import { createUser, getAllUsers, getUserById } from "./repositories/user.repository";
import { CreateUserDto } from "./models/user.model";
import { v4 } from "uuid";
import { table } from "console";

dotenv.config();
const app: Application = express();

const PORT = process.env.PORT || 8080;

app.use(cors);

app.get("/", (request: Request, response: Response) => {
    response.send("Hello World");
})

connectDB().then(() => {
   
    // start the server
    
    getUserById("688d9568-7932-4df6-86ca-708f9a9d2c05").then(res => {
        console.table(res);
    })


})

app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT ${PORT}`);
})

