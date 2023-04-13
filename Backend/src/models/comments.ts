import DbConnect from "./dbConnect";
import * as Type from "./types";
import { getTimeStamp } from "../utils/time";
import { User } from "./user";
import { Post } from "./posts";

export class Comment extends DbConnect{

    /*
    
        CREATE TABLE bf_comments (
        id int PRIMARY KEY AUTO_INCREMENT ,
        user_id int not null,
        post_id int not null,
        parent_comment int,
        content varchar(2048),
        created_at datetime not null,
    );
    
    */

    constructor(){
        super();
    }

    
    async add(user_id:number,post_id:number,content:string,parent_comment=-1){

        let timestamp = getTimeStamp() // add TIMESTAMP('${timestamp}','0:0:0' to the query

        let add_query = `
        INSERT INTO bf_comments (user_id,post_id,parent_comment,content,created_at)
        VALUES('${user_id}',${post_id},${parent_comment},'${content}',TIMESTAMP('${timestamp}','0:0:0'))

        `
        return new Promise<Type.ResponseMsg>(async(resolve, reject) => {

            let user = new User()
            let userResponse = await user.getById(user_id)
            user.close()

            if ( userResponse.status != 100){
                resolve(userResponse)
                return
            }

            let post = new Post()
            let postResponse = await post.get(post_id)
            post.close()

            if ( postResponse.status != 100){
                resolve(postResponse)
                return
            }

            this.connection.query(add_query, (err:any, rows:any, fields:any)=>{
                
                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })

            })
        })
    }

    private transformComment (rows:[]){

        let comment_map:Map<number,Type.CommentType> = new  Map()
        
        for (let com of rows){
            let {id,tag,parent_comment,created_at,content,likes} = com
            
            if (parent_comment != -1){
                
                let map_item = comment_map.get(parent_comment)
                let resp_com:Type.CommentResponseType = {
                    id:id,
                    user: tag,
                    content: content,
                    created_at: created_at,
                    likes: likes
                }
    
                if (!map_item){
                    comment_map.set(parent_comment,{
                        id:id,
                        user: "",
                        content: "",
                        responses: [resp_com],
                        created_at: "",
                        likes: 0
                    }
                        )
                }
                else{
                    map_item.responses.push(resp_com)
                }
            }
            else{

                let com:Type.CommentType = {
                    id:id,
                    user: tag,
                    content: content,
                    created_at: created_at,
                    responses:[],
                    likes: likes
                }

                comment_map.set(id,com)
                
            }

            
        }
        return comment_map
        
    }

    private async createComments(post_id:number){

        // make request here

        let comments_query = `
            SELECT comments.id, tags.tag, comments.parent_comment, comments.created_at, comments.content, COALESCE(likes.likes, 0) AS likes
            FROM bf_comments comments
            LEFT JOIN bf_tags tags ON comments.user_id = tags.context_id
            LEFT JOIN (
                SELECT count(*) as likes, context_id 
                FROM bf_likes
                GROUP BY context_id
            ) likes ON comments.id = likes.context_id 
            WHERE post_id = ${post_id};
        `



        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(comments_query, async (err:any, rows:any, fields:any)=>{
                
                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                let comments = this.transformComment(rows)
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {comments}
                })

            })

        })
    }

    /*
        should return the comment + the list of response
    */
    async get(post_id:number){

        
        return new Promise<Type.ResponseMsg>(async(resolve, reject) => {
            let response = await this.createComments(post_id)
            let comments = response.content as Map<number,Type.CommentType>

            if (response.status != 100){
                resolve({
                    status:response.status,
                    message:response.message,
                    content: {}
                })
            }


            resolve({
                status:100,
                message:Type.StatusTypes[100],
                content: comments
            })
        })

    }

    // async getSpecific(user_id:number,timestamp:string){
    //     let comment:Type.CommentType = {
    //         user:"@xyz",
    //         content:"",
    //         responses: [],
    //         created_at:"",
    //         likes:0
    //     }

    //     return new Promise<Type.ResponseMsg>((resolve, reject) => {
    //         resolve({
    //             status:100,
    //             message:"TODO",
    //             content: {
    //                 comment: comment
    //             }
    //         })
    //     })
    // }

    async delete(id:number){
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {}
            })
        })
    }


    

}