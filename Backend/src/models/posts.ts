import DbConnect from "./dbConnect";
import * as Type from "./types";
import { getTimeStamp } from "../utils/time";

export class Post extends DbConnect{

    /*

    CREATE TABLE bf_posts (
        id int PRIMARY KEY AUTO_INCREMENT ,
        user_id int not null,
        media_id int not null,
        content varchar(2048) ,
        created_at datetime,
        likes int DEFAULT 0
    );


    */

    constructor(){
        super();
    }

    
    async add(user_id:number,content:string,media_id = 0){

        let timestamp = getTimeStamp() // add TIMESTAMP('${timestamp}','0:0:0' to the query

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {}
            })
        })
    }

    async get(user_id:number){

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            resolve({
                status:100,
                message:"TODO",
                content: {}
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