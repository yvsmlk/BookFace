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

    async register(user_id:number,post_id:number){

        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {
            
            let register_post_query =`
            INSERT INTO bf_registeredposts (user_id, post_id) 
            SELECT user_id, post_id 
            FROM (
                SELECT 
                (SELECT id  FROM bf_users WHERE id = ${user_id}) AS user_id,
                (SELECT id  FROM bf_posts WHERE id = ${post_id}) AS post_id
            ) t
            WHERE user_id IS NOT NULL AND post_id IS NOT NULL;
            `
            
            this.connection.query(register_post_query, (err:any, rows:any, fields:any)=>{
                
                if (err){

                    const {code} = err

                    if (code == 'ER_DUP_ENTRY'){
                        resolve({
                            status:200,
                            message:Type.StatusTypes[200],
                            content: {}
                        })
                        return
                    }

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

    async addGroupPost(group_id:number,user_id:number,content:string,media_id = 0,timestamp = getTimeStamp() ){
        
        let add_response = await this.add(user_id,content,media_id,timestamp)
        

        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {
            
            if ( add_response.status != 100){
                resolve(add_response)
                return
            }
            
            let last_id_query = `
                SELECT LAST_INSERT_ID() AS id;
            `
            
            this.connection.query(last_id_query, (err:any, rows:any, fields:any)=>{
                
                if (err){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }
                
                const id = rows[0]['id'] || 0
                
                if (id == 0){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {}
                    })
                    return
                }
                
                let add_group_query = `
                    INSERT INTO bf_groupposts (post_id, group_id)
                    SELECT ${id}, ${group_id}
                    FROM bf_grouplist groupL
                    WHERE groupL.id = ${group_id};
                
                `
                this.connection.query(add_group_query, (err:any, rows:any, fields:any)=>{
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

    async get(post_id:number ){
        
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
                    publisher: rows[0]['user_id'],
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

    private createSelectQuery(order:Type.PostOrderType,select:Type.PostSelectionType,tag:string,n:number){

        let base_query = ""

        // base 

        switch (select) {
            case 'GROUP':
                base_query = this.SELECT_GROUP(tag)
                break;
            case 'USER':
                base_query = this.SELECT_USER(tag)
                break;
            case 'PUBLIC':
                base_query = this.SELECT_PUBLIC()
                break;
        
            default:
                break;
        }

        

        // order + limit
        switch (order) {
            case 'LATEST':
                base_query += `
                ORDER BY created_at DESC
                LIMIT ${n}
                `
                break;
            case 'LATEST':
                base_query += `
                ORDER BY likes DESC
                LIMIT ${n}
                `
                break;
        
            default:
                break;
        }

        return base_query

    }

    async select(tag:string,order:Type.PostOrderType = 'LATEST',
    selection:Type.PostSelectionType ='PUBLIC',n=5){

        let get_query = this.createSelectQuery(order,selection,tag,n)
        console.log(get_query);
        
        return new Promise<Type.ResponseMsg>( async (resolve, reject) => {


            this.connection.query(get_query, (err:any, rows:[], fields:any)=>{
                
                if (err){
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
                        content: []
                    })
                    return
                }

                let output = []

                for( let x of rows){
                    output.push(
                        {
                            post_id: x['id'],
                            publisher: x['publisher'],
                            media: x['media_id'],
                            content: x['content'],
                            created_at: x['created_at'],
                            likes: x['likes']
                        }
                    )
                }
                
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: output
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

    private SELECT_GROUP(gp_tag:string){
        return(
            `
            SELECT gpost.post_id AS id, 
            tags.tag AS GP_TAG , 
            COALESCE(UTags.tag, '') AS publisher, 
            posts.content, 
            posts.media_id, 
            posts.created_at, 
            COALESCE(likes.likes, 0) AS likes 
            FROM bf_groupposts gpost 
            INNER JOIN bf_tags tags 
                ON tags.context_id = gpost.group_id 
            LEFT JOIN bf_posts posts 
                ON gpost.post_id = posts.id 
            LEFT JOIN bf_tags UTags 
                ON UTags.context_id = posts.user_id 
            LEFT JOIN (
                SELECT context_id, count(*) AS likes 
                FROM bf_likes 
                GROUP BY context_id
            ) likes 
                ON gpost.post_id = likes.context_id 
            WHERE tags.tag = '${gp_tag}' 
            `

        )
    } 

    private SELECT_USER(u_tag:string){
        return(
            `
            SELECT regPost.post_id AS id, regUTag.tag AS RUTAG, 
            UTags.tag AS publisher , posts.content, 
            posts.media_id, posts.created_at, 
            COALESCE(likes.likes, 0) AS likes
            FROM bf_registeredposts regPost 
            INNER JOIN bf_tags regUTag on regPost.user_id = regUTag.context_id
            LEFT JOIN bf_posts posts ON regPost.post_id = posts.id 
            LEFT JOIN bf_tags UTags ON UTags.context_id = posts.user_id 
            LEFT JOIN (
                SELECT context_id, count(*) AS likes 
                FROM bf_likes 
                GROUP BY context_id
            ) likes ON regPost.post_id = likes.context_id 
            WHERE regUTag.tag = '${u_tag}'
            `

        )
    } 

    private SELECT_PUBLIC(){
        return(
            `
            SELECT posts.id, 
            UTags.tag AS publisher , 
            posts.content, 
            posts.media_id, 
            posts.created_at, 
            COALESCE(likes.likes, 0) AS likes
            from  bf_posts posts
            left join bf_groupposts gPosts  on gPosts.post_id = posts.id
            LEFT JOIN bf_tags UTags ON UTags.context_id = posts.user_id 
            LEFT JOIN (
                SELECT context_id, count(*) AS likes 
                FROM bf_likes 
                GROUP BY context_id
            ) likes ON posts.id = likes.context_id 
            WHERE gPosts.post_id is null
            `

        )
    } 
    
}