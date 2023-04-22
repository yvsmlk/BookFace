import { Request, Response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Tags } from "../models/tags";


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

export const changeTag = async (req: Request, res: Response)=>{

    const {new_tag} = req.body
    
    if ( !new_tag){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:{
                        new_tag:"xyz"
                    }
                }
            }
            )
            return
    }

    
    let tag = new Tags()
    let resp = await tag.updateTag(req.params.user_tag,"@"+new_tag)
    tag.close()
    if ( resp.status != 100){
        res.status(400).json(
            {
                status:resp.status,
                message:resp.message,
                content: resp.content
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

