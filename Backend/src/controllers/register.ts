import { Request, Response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";

export const register = async (req:Request, res:Response)=>{
    //TODO
    const { email, pwd } = req.body;
  
    if (!email || !pwd) {
      res.status(400).json({
        status:400,
        message:Type.StatusTypes[400],
        content: {}
    });
      return;
    }
  
    let user = new User()
    let resp = await user.register(email,pwd)
    user.close()
    if (resp.status != 100){
        res.status(400).json(
            {
                status:resp.status,
                message:resp.message,
                content: {}
            }
        )

        return
    }

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
    
}