import DbConnect from "./dbConnect";
import * as Type from "./types";


export class Session extends DbConnect{

    /*
    
    CREATE TABLE sessions (
    id int PRIMARY KEY AUTO_INCREMENT ,
    user_id int not null
    );
    
    */

    constructor(){
        super();
    }

    getSession(user_id:number){
        //
        let sql_add_session = `
        SELECT * FROM bf_sessions
        WHERE user_id = '${user_id}'
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

                
                if (rows.length == 0){
                    resolve({
                        status:201,
                        message: Type.StatusTypes[201],
                        content: {}
                    })
                    return
                }
                        
                resolve({
                    status:100,
                    message:Type.StatusTypes[100],
                    content: rows
                })
            })
        })

    } 


    addSession(user_id:number){
        let sql_add_session = `
        INSERT INTO bf_sessions (user_id)
        VALUES('${user_id}')
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

    deleteSession(user_id:number){
        let sql_del_session = `
        DELETE FROM bf_sessions 
        WHERE user_id = '${user_id}'
        `

        return new Promise<Type.ResponseMsg>((resolve, reject) => {
            this.connection.query(sql_del_session, async (err:any, rows:any, fields:any)=>{
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

}