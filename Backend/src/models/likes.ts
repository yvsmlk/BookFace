import DbConnect from "./dbConnect";
import * as Type from "./types";
import { getTimeStamp } from "../utils/time";
import { User } from "./user";



export class Like extends DbConnect{

    constructor(){
        super();
    }


    async like(context_id:number,user_id:number,type=Type.LikeType.POST){
 
        let like_query = `
         INSERT INTO bf_likes (type,user_id,context_id)
         VALUES ("${type}",${user_id},${context_id})
         ON DUPLICATE KEY UPDATE do_delete = true;
        `

        let del_query = `
         DELETE FROM bf_likes
         WHERE do_delete = true;
        `
 
         return new Promise<Type.ResponseMsg>(async (resolve, reject) => {
 
 
             this.connection.query(like_query, 
                 (err:any, rows:any, fields:any)=>{
 
                 if (err){
                     resolve({
                         status:404,
                         message:Type.StatusTypes[404],
                         content: {error: err}
                     })
                     return
                 }

                 this.connection.query(del_query,(err:any, rows:any, fields:any)=>{
                    if (err){
                        resolve({
                            status:404,
                            message:Type.StatusTypes[404],
                            content: {error: err}
                        })
                        return
                    }
                 })
 
                 resolve({
                     status:100,
                     message:Type.StatusTypes[100],
                     content: {}
                 })
 
             })
         })
     }

    async get(context_id:number){

        let like_query = `
            select count(*) as likes from bf_likes
            where context_id = ${context_id}
        `
 
         return new Promise<Type.ResponseMsg>(async (resolve, reject) => {
 
 
             this.connection.query(like_query, 
                 (err:any, rows:any, fields:any)=>{
 
                 if (err){
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
                     content: {likes:rows[0]['likes']}
                 })
 
             })
         })

    }

}