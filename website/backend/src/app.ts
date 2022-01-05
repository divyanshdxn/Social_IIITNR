import express,{ Application, Response, Request } from "express";
import dotenv from 'dotenv'

dotenv.config();
const app : Application = express();

const PORT = process.env.PORT || 8080;

app.get("/",(request:Request, response:Response) => {
    response.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`SERVER STARTED AT PORT ${PORT}`);
})