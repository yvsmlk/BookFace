import DbConnect from "./dbConnect";
import * as Type from "./types";
import { getTimeStamp } from "../utils/time";
import { User } from "./user";

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

    
    async add(user_id:number,content:string,media_id = 0,timestamp = getTimeStamp() ){

        let add_query = `
        INSERT INTO bf_posts (user_id,media_id,content,created_at)
        VALUES('${user_id}',${media_id},'${content}',TIMESTAMP('${timestamp}','0:0:0'))
        `

        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {

            let user = new User()
            let userResponse = await user.getById(user_id)
            user.close()

            if ( userResponse.status != 100){
                resolve(userResponse)
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

    private async createPost(post_id:number){

        
        let find_query = `
        SELECT * FROM bf_posts 
        WHERE id = '${post_id}'
        `


        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(find_query, (err:any, rows:any, fields:any)=>{

                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
                    })
                    return
                }

                let post = {
                    user: rows[0]['user_id'],
                    media: rows[0]['media_id'],
                    content: rows[0]['content'],
                    created_at: rows[0]['created_at'],
                    likes:rows[0]['likes']
                }

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {
                        post:post
                    }
                })

            })
        })
    }

    async get(post_id:number){
        
        let get_query = `
        SELECT * FROM bf_posts
        WHERE id = ${post_id}
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(get_query, 
                (err:any, rows:any, fields:any)=>{

                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows == 0){

                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
                    })
                    return 
                }

                let post = {
                    post_id: rows[0]['id'],
                    user: rows[0]['user_id'],
                    media: rows[0]['media_id'],
                    content: rows[0]['content'],
                    created_at: rows[0]['created_at'],
                    likes: rows[0]['likes']
                }
    
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: { post:post}
                })

            })

        })

    }

    async getUser(user_id:number,timestamp:string){

        let find_query = `
        SELECT * FROM bf_posts 
        WHERE user_id = ${user_id} AND created_at = TIMESTAMP('${timestamp}','0:0:0')
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(find_query, (err:any, rows:any, fields:any)=>{

                

                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
                    })
                    return
                }

                let post = {
                    post_id: rows[0]['id'],
                    user: rows[0]['user_id'],
                    media: rows[0]['media_id'],
                    content: rows[0]['content'],
                    created_at: rows[0]['created_at'],
                    likes: rows[0]['likes']
                }

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {
                        post:post
                    }
                })

            })
        })
    }

    async delete(post_id:number){

        let find_query = `
        DELETE FROM bf_posts
        WHERE id = '${post_id}'
        `


        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            let postResponse = await this.get(post_id)

            if (postResponse.status != 100){
                resolve(postResponse)
                return
            }
            
            this.connection.query(find_query, (err:any, rows:any, fields:any)=>{

                if (err){
                    console.log(err)
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
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

    async like(post_id:number,action=Type.LikeAction.INCREMENT){

       let increment_query =`
        UPDATE bf_posts
        SET likes = likes +1
        WHERE id = '${post_id}'
       `

       let decrement_query =`
        UPDATE bf_posts
        SET likes = 
        CASE likes 
            WHEN 0 THEN 0
            ELSE likes - 1
        END
        WHERE id = '${post_id}'
       `

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {

            let postResponse = await this.get(post_id)

            if (postResponse.status != 100){
                resolve(postResponse)
                return
            }

            this.connection.query(action == Type.LikeAction.INCREMENT ? increment_query:decrement_query, 
                (err:any, rows:any, fields:any)=>{

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

    

}