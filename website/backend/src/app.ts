import express, { Application, Response, Request, response } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from "./helpers/database/connection";
import { createUser, getAllUsers } from "./repositories/user.repository";
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
    
    getAllUsers().then(res => {
        console.table(res);
    })


})

app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT ${PORT}`);
})

