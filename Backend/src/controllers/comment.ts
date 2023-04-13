import { Post } from '../models/posts';
import { Request, Response, response } from "express";
import { User } from "../models/user";
import * as Type from "../models/types";
import { Tags } from '../models/tags';
import { checkResponse } from '../utils/response';
import { Like } from '../models/likes';
import { Comment } from '../models/comments';


export const addComment = async (req:Request, res:Response)=>{
    const {tag,content,post_id,parent_comment} = req.body

    if (!tag ||!content || !post_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        tag:"@xyz",
                        content:"test content",
                        post_id:-1,
                        parent_comment:-1
                    }
                }
            }
        )
        return
    }

    let comment_obj = new Comment()
    let tag_obj = new Tags()
    
    //check tag 

    let tag_response = await tag_obj.getTag(tag)
    tag_obj.close
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
        
    let comment_response = await comment_obj.add(id,post_id,content,parent_comment||-1)
    comment_obj.close()

    if (!checkResponse(comment_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )

}

export const getComment =async (req:Request, res:Response) => {

    const {post_id} = req.query 

    if (!post_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {
                    exemple:{
                        post_id:1
                    }
                }
            }
        )
        return
    }

    let comment_obj = new Comment()

    let comment_response = await comment_obj.get(parseInt(post_id as string))

    comment_obj.close

    if (!checkResponse(comment_response,res))return

    let comment_list:Type.CommentType[] = []

    
    let {comments} = comment_response.content as {comments: Map<number,Type.CommentType>}
    
    for (let x of comments){
        comment_list.push(x[1])
    }
    

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: comment_list
        }
    )
}

export const likeComment = async (req:Request, res:Response)=>{
    const {tag,context_id} = req.body

    if ( !tag || !context_id){
        res.status(400).json(
            {
                status:400,
                message:Type.StatusTypes[400],
                content: {}
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

    let like_response = await like_obj.like(context_id,id,Type.LikeType.COMMENT)

    if (!checkResponse(like_response,res))return

    res.status(200).json(
        {
            status:100,
            message:Type.StatusTypes[100],
            content: {}
        }
    )
}