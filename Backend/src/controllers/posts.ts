import { Post } from '../models/posts';
import { Request, Response, response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Tags } from '../models/tags';
import { checkResponse } from '../utils/response';
import { Like } from '../models/likes';

export const addPost = async (req:Request, res:Response)=>{
    //TODO
    const {content,media} = req.body

    if (!content){
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

    let post_response = await post_obj.add(parseInt(req.params.user_id),content,media||0)
    post_obj.close()
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
    const {group_tag,content,media} = req.body

    if ( !group_tag ||!content){
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
    
    // //check tag 

    // let user_tag_response = await tag_obj.getTag(user_tag)
    let group_tag_response = await tag_obj.getTag(group_tag)
    tag_obj.close()
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

    let post_response = await post_obj.addGroupPost(ginfo.id,parseInt(req.params.user_id),content,media||0)
    post_obj.close()
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
    const {posts_id} = req.body

    if ( !posts_id){
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
    
    let post_response = await post_obj.register(parseInt(req.params.user_id),posts_id)
    post_obj.close()
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

    const {n,order} = req.query

    // if (!user_tag){
    //     res.status(400).json(
    //         {
    //             status:201,
    //             message:Type.StatusTypes[201],
    //             content: {
    //                 example: 'host/posts/registered?user_tag=@xyz&order=LATEST&n=5'
    //             }
    //         }
    //     )
    //     return
    // }

    let post_obj = new Post()
    let limit = n == undefined ? 5: parseInt(n as string)
    let post_response = await post_obj.select(req.params.user_tag,(order || 'LATEST') as Type.PostOrderType,'USER',isNaN(limit)?5:limit)
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
    const {context_id} = req.body

    if ( !context_id){
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

    let like_response = await like_obj.like(context_id,parseInt(req.params.user_id),Type.LikeType.POST)
    like_obj.close()
    if (!checkResponse(like_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: like_response.content
        }
    )
}