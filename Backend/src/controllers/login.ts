import { Request, Response } from "express";
import { User } from "../models/user";
import { Session } from "../models/sessions";
import { signJWT } from "../utils/token";
import  bcrypt, { hashSync }  from "bcrypt";
import * as Type from "../models/types";


const basicConnect = async (email:string,pwd:string,hashedPwd:string,id:number,req: Request, res: Response)=>{

    if(bcrypt.compareSync(pwd,hashedPwd)){

        const accessToken = signJWT({"email": email,"id": id}, process.env.ACCESS_TOKEN_TTL as string ||'20m');
        const refreshToken = signJWT({"email": email,"id": id}, process.env.REFRESH_TOKEN_TTL as string || '1d');

        try {
            // await user.update("",0,refreshToken)
                
            res.cookie("VRToken",refreshToken,{httpOnly:true,maxAge:24*60*60*1000, sameSite:"none" ,secure:true})
            res.cookie("VAToken",accessToken,{httpOnly:true,maxAge:20*60*1000, sameSite:"none" ,secure:true})

            res.status(200).json(
                {
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                }
            )
        } catch (error) {
            res.status(400).json(
                {
                    status:404,
                    message:Type.StatusTypes[404],
                    content: {}
                }
            )
        }
    }
    else{
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: {}
            }
        )
        return
    }
}

export const login = async (req:Request, res:Response)=>{
    const {email,pwd} = req.body

    if (!email || !pwd){
        res.status(400).json(
            {
                status:404,
                message:Type.StatusTypes[404],
                content: {}
            }
        )
        return
    }

    let user = new User()
    let resp = await user.login(email,pwd)
    user.close()
    if ( resp.status != 100){
        res.status(400).json(
            {
                status:resp.status,
                message:resp.message,
                content: {}
            }
        )
        return
    }

    let {hashedPWD,id} = resp.content as {hashedPWD:string,id:number}
    
    basicConnect(email,pwd,hashedPWD,id,req, res)
}