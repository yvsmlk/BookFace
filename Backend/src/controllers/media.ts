import { Request, Response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Media } from "../models/media";


export const getMedia = async (req: Request, res: Response)=>{

    const {media_id} = req.query

    let m = parseInt(media_id as string )

    if (isNaN(m)){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: {}
            }
        )
        return
    }

    let media = new Media()
    let resp = await media.get(m)
    media.close()
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

