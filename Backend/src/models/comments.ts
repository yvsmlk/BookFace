import DbConnect from "./dbConnect";
import * as Type from "./types";
import { getTimeStamp } from "../utils/time";

export class Comment extends DbConnect{

    /*
    
        CREATE TABLE bf_comments (
        id int PRIMARY KEY AUTO_INCREMENT ,
        user_id int not null,
        post_id int not null,
        parent_comment int,
        content varchar(2048),
        created_at datetime not null,
        likes int DEFAULT 0
    );
    
    */

    constructor(){
        super();
    }

    
    async add(user_id:number,post_id:number,content:string,parent_comment=-1){

        let timestamp = getTimeStamp() // add TIMESTAMP('${timestamp}','0:0:0' to the query

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {}
            })
        })
    }

    private async createComments(id:number){
        // make request here

        let defaultComment = {
            user:-1,
            content:"",
            responses: [],
            created_at: ""
        }

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {
                    comment : defaultComment
                }
            })
        })
    }

    /*
        should return the comment + the list of response
    */
    async get(id:number){

        let response = await this.createComments(id)
        let {comment} = response.content as {comment:Type.CommentType}

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {
                    comment: comment
                }
            })
        })

    }

    async delete(id:number){
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {}
            })
        })
    }

    async like(id:number){
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {}
            })
        })
    }

    

}