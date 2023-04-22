import { Request, Response } from "express";
import { Follow } from "../models/follow";
import * as Type from "../models/types";


export const follow = async (req: Request, res: Response)=>{

    
    const {user} = req.query
    
    if ( !user){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:"host/users/follow?user=@xyz"
                }
            }
            )
            return
    }
        
    let follow = new Follow()
    let resp = await follow.follow(user as string,req.params.user_tag)
    follow.close()

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

export const getFollowers = async (req: Request, res: Response)=>{

    
    const {user} = req.query
    
    if ( !user){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:"host/users/followers?user=@xyz"
                }
            }
            )
            return
    }

    let user_x = user == "self"?req.params.user_tag:user as string
        
    let follow = new Follow()
    let resp = await follow.getFollowers(user_x)
    follow.close()

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

export const getFollows = async (req: Request, res: Response)=>{

    
    const {user} = req.query
    
    if ( !user){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:"host/users/follows?user=@xyz"
                }
            }
            )
            return
    }

    let user_x = user == "self"?req.params.user_tag:user as string
        
    let follow = new Follow()
    let resp = await follow.getFollows(user_x)
    follow.close()

    if ( resp.status != 100){
        res.status(400).json(
            {
                status:resp.status,
                message:resp.message,
                content: resp.status
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

export const suggest = async (req: Request, res: Response)=>{

    let follow = new Follow()
    let resp = await follow.suggest(req.params.user_tag)
    follow.close()

    if ( resp.status != 100){
        res.status(400).json(
            {
                status:resp.status,
                message:resp.message,
                content: resp.status
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
