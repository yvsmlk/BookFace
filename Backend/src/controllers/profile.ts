import { Request, Response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";


export const getProfile = async (req: Request, res: Response)=>{

    let user = new User()
    let resp = await user.getProfile(req.params.user_tag)
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

    res.status(200).json(
        {
            status:resp.status,
            message:resp.message,
            content: resp.content
        }
    )
    
}

