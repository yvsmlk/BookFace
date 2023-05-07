import { Request, Response } from "express";
import { verifyJWT } from "../utils/token";
import * as Type from "../models/types";
import { User } from "../models/user";

export const logout = async (req:Request, res:Response)=>{

    let user = new User()
    let resp = await user.logout(parseInt(req.params.user_id))
    user.close()
    if (resp.status != 100){
        res.status(400).json({
            status:resp.status,
            message:resp.message,
            content: resp.content
        })
        return
    }

    res.status(200).json({
        status:100,
        message:Type.StatusTypes[100],
        content: {}
    })
}