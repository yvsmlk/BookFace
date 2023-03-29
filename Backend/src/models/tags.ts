import DbConnect from "./dbConnect";
import * as Type from "./types";


export class Tags extends DbConnect{

    /*
    
    CREATE TABLE tags (
        id int PRIMARY KEY AUTO_INCREMENT ,
        context_id int not null,
        tag VARCHAR(100),
        type VARCHAR(100)
    );
    
    */

    constructor(){
        super();
    }

    getTag(tag:string){
        //
        let sql_get_session = `
        SELECT * FROM bf_tags
        WHERE tag = '${tag}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(sql_get_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
                    })
                }

                if (rows.length == 0){
                    resolve({
                        status:201,
                        message:Type.StatusTypes[201],
                        content: {}
                    })
                    return
                }

                console.log(rows)

                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: {
                        id :rows[0]["context_id"],
                        tag :rows[0]["tag"],
                        type :rows[0]["type"]
                    }
                })
            })

        })

    } 

    getTagById(id:number,type:string){
        //
        let sql_get_session = `
        SELECT * FROM bf_tags
        WHERE context_id = '${id}' AND type = '${type}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {

            this.connection.query(sql_get_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
                    })
                    console.log(err)
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
                    content: {
                        id :rows[0]["context_id"],
                        tag :rows[0]["tag"],
                        type :rows[0]["type"]
                    }
                })
            })

        })

    }


    addTag(user_id:number,tag:string,type:string){
        //
        let sql_add_session = `
        INSERT INTO bf_tags (context_id,tag,type)
        VALUES('${user_id}', '${tag}','${type}')
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_add_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
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

    deleteTag(id:number){
        let sql_del_session = `
        DELETE FROM bf_tags 
        WHERE context_id = '${id}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_del_session, async (err:any, rows:any, fields:any)=>{
                if (err){
                    resolve({
                        status:202,
                        message:Type.StatusTypes[202],
                        content: {error: err}
                    })
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