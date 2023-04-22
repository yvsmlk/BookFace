import { Request, Response } from "express";
import { Group } from "../models/group";
import * as Type from "../models/types";
import { checkResponse } from "../utils/response";


export const create = async (req: Request, res: Response)=>{

    //name:string,creator_id:number

    const {name} = req.query
    
    if ( !name){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:"host/groups/join?name=xyz"
                }
            }
            )
            return
    }

    let group = new Group()
    console.log("IN");
    
    let resp_group = await group.create(name as string,parseInt(req.params.user_id) )
    group.close()

    if (!checkResponse(resp_group,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
    
}

export const join = async (req: Request, res: Response)=>{
    
    //u_tag:string ,gp_tag:string

    const {gp_tag} = req.query
    
    if ( !gp_tag){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:"host/groups/join?name=xyz"
                }
            }
            )
            return
    }

    let group = new Group()
    let resp_group = await group.join(req.params.user_tag,gp_tag as string )
    group.close()

    if (!checkResponse(resp_group,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
    
    
}

export const getMembers = async (req: Request, res: Response)=>{

   
}