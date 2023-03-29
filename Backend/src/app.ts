/* Package imports */
import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = 3535

const  whitelist = ['https://liolle.github.io','http://localhost:5173','http://localhost:4173']

var corsOptions = {
  credentials: true,
  origin: whitelist
}

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));



app.use('/login',require('./routes/login.routes'))
app.use('/logout',require('./routes/logout.routes'))
app.use('/register',require('./routes/register.routes'))


app.listen(PORT,() =>{
    console.log( `\nServer running on ---> http://localhost:${PORT}\n`)
});