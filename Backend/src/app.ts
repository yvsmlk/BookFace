/* Package imports */
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = 3535

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors());




app.listen(PORT,() =>{
    console.log( `\nServer running on ---> http://localhost:${PORT}\n`)
});