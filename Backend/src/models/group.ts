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

    findRandomTag = async ( attemptLeft=5):Promise<Type.ResponseMsg> =>{
        let current = randomTag()
        let output = await this.getTag(current)

        if (attemptLeft ==0){
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
            return this.findRandomTag(attemptLeft -1)
        }
    
    }

    create = async (name:string,creator_id:number)=>{

        let timestamp = getTimeStamp()
        
        // verify uniqueness of the timestamp return status accordingly 
        let {tagname} = (await this.findRandomTag()).content as {tagname:string}
        let sql_register = `
        INSERT INTO bf_groups (user_id,name,created_at)
        VALUES('${creator_id}','${name}',TIMESTAMP('${timestamp}','0:0:0'))
        `
        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            if (!tagname){
                resolve({
                    status:202,
                    message:Type.StatusTypes[202],
                    content: {}
                })
                return
            }

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

                let tag = new Tags()

                let dbUser = await this.get(name)
                tag.close()

                // if (dbUser.status != 100){
                //     resolve({
                //         status:202,
                //         message:Type.StatusTypes[202],
                //         content: {}
                //     })
                //     return
                // }

                // let {id} = dbUser.content as {
                //     id:number
                // }

                // let tagRes = await tag.addTag(id,tagname,Type.TagTypes.USER)
                // tag.close()

                // if ( tagRes.status != 100){
                //     resolve({
                //         status:202,
                //         message:Type.StatusTypes[202],
                //         content: tagRes.content
                //     })
                //     return
                // }
                
                
                // resolve({
                //     status:100,
                //     message:Type.StatusTypes[100],
                //     content: {}
                // })
            })
        })

        // console.log(` Tag: ${tag}, Created_at: ${timestamp}`)
    }

}