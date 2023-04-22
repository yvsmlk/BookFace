import DbConnect from "./dbConnect";
import { getTimeStamp } from "../utils/time";
import { randomTag } from "../utils/random";

import * as Type from "./types";
import { Tags } from "./tags";

export class Group extends DbConnect {

    constructor(){
        super();
        
    }

    async get(name:string){
        let sql_get_user = `
        SELECT * FROM bf_grouplist
        WHERE name = '${name}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(sql_get_user, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
                    })
                    return
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {name:name}
                    })
                    return
                }

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {
                        id:rows[0]['id'],
                        user_id: rows[0]['user_id'],
                        name:rows[0]['name'],
                        created_at: rows[0]['created_at']
                    }
                })
            })

        })

    }

    async getTag(tag:string){
        let query = `
        SELECT * FROM bf_tags WHERE tag = '${tag}'
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(query, (err:any, rows:[], fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message: Type.StatusTypes[202],
                        content : {}
                    })
                    console.log(err)
                    return
                }

                if (rows.length > 0){
                    resolve({
                        status:200,
                        message: Type.StatusTypes[200],
                        content: {}
                    })
                    return
                }

                resolve({
                    status:100,
                    message: Type.StatusTypes[100],
                    content: rows
                })
            })
        })

    }

    findRandomTag = async ( tagAttempt:string,attemptLeft=5):Promise<Type.ResponseMsg> =>{
        let current = tagAttempt || randomTag()
        let output =  await this.getTag(current)

        if (current.length<4 || output.status != 100){
            return new Promise<Type.ResponseMsg>((resolve, reject) => {
                resolve({
                    status:404,
                    message:Type.StatusTypes[400],
                    content: {}
                })
            })
        }

        if (output.status != 100 && attemptLeft ==0){
            return new Promise<Type.ResponseMsg>((resolve, reject) => {
                resolve({
                    status:404,
                    message:Type.StatusTypes[400],
                    content: {}
                })
            })
        }

        if (output.status == 100){
            return new Promise<Type.ResponseMsg>((resolve, reject) => {
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {tagname:current}
                })
            })

        }
        else{
            return this.findRandomTag("",attemptLeft -1)
        }
    
    }

    create = async (name:string,creator_id:number)=>{

        
        return new Promise<Type.ResponseMsg>(async(resolve, reject) => {

            let timestamp = getTimeStamp()
            let res_tag = await this.findRandomTag('@'+name,0)
            
            if (res_tag.status != 100){
                resolve({
                    status:200,
                    message:Type.StatusTypes[200],
                    content: {}
                })
                return
            }
    
            let {tagname} = res_tag.content as {tagname:string}
            let sql_register = `
            INSERT INTO bf_grouplist (user_id,name,created_at)
            VALUES('${creator_id}','${name}',TIMESTAMP('${timestamp}','0:0:0'))
            `
            console.log("TAG1");    
            if (!tagname){
                resolve({
                    status:400,
                    message:Type.StatusTypes[400],
                    content: {}
                })
                return
            }
            console.log("TAG11");
            this.connection.query(sql_register, async (err:any, rows:any, fields:any)=>{
                if (err){
                    let {code} = err
                    if (code == 'ER_DUP_ENTRY'){
                        resolve({
                            status:200,
                            message:Type.StatusTypes[200],
                            content: {name:name}
                        })
                        return
                    }
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
                    })
                    return

                }

                console.log("TAG2");
                let group = await this.get(name)
                
                if (group.status != 100){
                    resolve({
                        status:group.status,
                        message:group.message,
                        content: group.content
                    })
                    return
                }

                let {id} = group.content as {
                    id:number
                }
                console.log("TAG3");
                let tag = new Tags()
                tag.addTag(id,"@"+name,Type.TagTypes.GROUP)
                tag.close()
                
                console.log("TAG4");

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {}
                })
                return
                
                
            })
        })

    }

    join = async (u_tag:string,gp_tag:string)=>{

        let query_join = `
        INSERT INTO bf_usergroup (user_id, group_id) 
        select T.context_id as user_id ,T1.context_id as group_id from bf_tags T
        cross join bf_tags T1 on T1.tag = '${gp_tag}'
        where T.tag= '${u_tag}'
        ON DUPLICATE KEY UPDATE do_delete = true;
        `

        let query_leave = `
        DELETE FROM bf_usergroup
        WHERE do_delete = true;
        `

        return new Promise<Type.ResponseMsg>(async (resolve, reject) => {
 
 
            this.connection.query(query_join, 
                (err:any, rows:any, fields:any)=>{

                if (err){
                    resolve({
                        status:404,
                        message:Type.StatusTypes[404],
                        content: {error: err}
                    })
                    return
                }

                this.connection.query(query_leave,(err:any, rows:any, fields:any)=>{
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


    getMembers = async (gp_tag:string)=>{

    }

    suggestionGroup = async (u_tag:string)=>{

    }

}