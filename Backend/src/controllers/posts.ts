import { Post } from '../models/posts';
import { Request, Response, response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Tags } from '../models/tags';
import { checkResponse } from '../utils/response';
import { Like } from '../models/likes';

export const addPost = async (req:Request, res:Response)=>{
    //TODO
    const {tag,content,media} = req.body

    if (!tag ||!content){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        tag:"@xyz",
                        content:"test content",
                        media:0
                    }
                }
            }
        )
        return
    }

    let post_obj = new Post()
    let tag_obj = new Tags()
    
    //check tag 

    let tag_response = await tag_obj.getTag(tag)

    if (!checkResponse(tag_response,res))return

    const {id,type} = tag_response.content as {id:number,type:string}

    if (type != Type.TagTypes.USER){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+tag 
            }
        )
        return
    }

    let post_response = await post_obj.add(id,content,media||0)

    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )

}

export const addGroupPost = async (req:Request, res:Response)=>{
    //TODO
    const {user_tag,group_tag,content,media} = req.body

    if (!user_tag || !group_tag ||!content){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        user_tag:"@xyz",
                        group_tag:"@xyz",
                        content:"test content",
                        media:0
                    }
                }
            }
        )
        return
    }

    let post_obj = new Post()
    let tag_obj = new Tags()
    
    //check tag 

    let user_tag_response = await tag_obj.getTag(user_tag)
    let group_tag_response = await tag_obj.getTag(group_tag)
    

    if (!checkResponse(user_tag_response,res))return
    if (!checkResponse(group_tag_response,res))return

    let uinfo = user_tag_response.content as {id:number,type:string}


    if (uinfo.type != Type.TagTypes.USER){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+user_tag 
            }
        )
        return
    }

    let ginfo = group_tag_response.content as {id:number,type:string}


    if (ginfo.type != Type.TagTypes.GROUP){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+group_tag 
            }
        )
        return
    }

    let post_response = await post_obj.addGroupPost(ginfo.id,uinfo.id,content,media||0)

    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )

}

export const registerPost = async (req:Request, res:Response)=>{
    //TODO
    const {user_tag,posts_id} = req.body

    if (!user_tag || !posts_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        user_tag:"@xyz",
                        posts_id:2
                    }
                }
            }
        )
        return
    }

    let post_obj = new Post()
    let tag_obj = new Tags()
    
    //check tag 

    let user_tag_response = await tag_obj.getTag(user_tag)
    if (!checkResponse(user_tag_response,res))return
    let uinfo = user_tag_response.content as {id:number,type:string}

    if (uinfo.type != Type.TagTypes.USER){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+user_tag 
            }
        )
        return
    }

    let post_response = await post_obj.register(uinfo.id,posts_id)

    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )

}


export const getGroupPost =async (req:Request, res:Response) => {

    const {group_tag,order,n} = req.query
    console.log(group_tag);
    
    if (!group_tag){
        // group post
        res.status(400).json(
            {
                status:201,
                message:Type.StatusTypes[201],
                content: {
                    exemple:'host/posts/group?group_tag=@xyz&order=LATEST&n=5'
                }
            }
        )
        return
    }

    let post_obj = new Post()
    let limit = n == undefined ? 5: parseInt(n as string)
    let post_response = await post_obj.select(group_tag as string,(order || 'LATEST') as Type.PostOrderType,'GROUP',isNaN(limit)?5:limit)
    post_obj.close()
    
    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: post_response.content
        }
    )
}

export const getRegisteredPost =async (req:Request, res:Response) => {

    const {user_tag,n,order} = req.query

    if (!user_tag){
        res.status(400).json(
            {
                status:201,
                message:Type.StatusTypes[201],
                content: {
                    example: 'host/posts/registered?user_tag=@xyz&order=LATEST&n=5'
                }
            }
        )
        return
    }

    let post_obj = new Post()
    let limit = n == undefined ? 5: parseInt(n as string)
    let post_response = await post_obj.select(user_tag as string,(order || 'LATEST') as Type.PostOrderType,'USER',isNaN(limit)?5:limit)
    post_obj.close()

    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: post_response.content
        }
    )

    
}

export const getPublicPost =async (req:Request, res:Response) => {

    const {n,order} = req.query

    let post_obj = new Post()
    let limit = n == undefined ? 5: parseInt(n as string)
    let post_response = await post_obj.select("",(order || 'LATEST') as Type.PostOrderType,'PUBLIC',isNaN(limit)?5:limit)
    post_obj.close()

    if (!checkResponse(post_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: post_response.content
        }
    )

    
}

export const likePost = async (req:Request, res:Response)=>{
    const {tag,context_id} = req.body

    if ( !tag || !context_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    example:{
                        tag:"@xyz",
                        context_id:"test content"
                    }
                }
            }
        )
        return
    }
    
    let like_obj = new Like()
    let tag_obj = new Tags()

    let tag_response = await tag_obj.getTag(tag)

    if (!checkResponse(tag_response,res))return

    const {id,type} = tag_response.content as {id:number,type:string}

    if (type != Type.TagTypes.USER){
        res.status(400).json(
            {
                status:401,
                message:Type.StatusTypes[401],
                content: "Wrong tag type: "+tag 
            }
        )
        return
    }

    

    let like_response = await like_obj.like(context_id,id,Type.LikeType.POST)

    if (!checkResponse(like_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
}