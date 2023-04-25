import DbConnect from "./dbConnect";
import * as Type from "./types";




export class Media extends DbConnect{

    constructor(){
        super();
    }


    async get(media_id:number){

        let media_query = `
            select * from bf_media
            where id = ${media_id}
        `
 
         return new Promise<Type.ResponseMsg>(async (resolve, reject) => {
 
 
             this.connection.query(media_query, 
                 (err:any, rows:any, fields:any)=>{
 
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
                        content: {}
                    })
                    return
                 }
 
                 resolve({
                     status:100,
                     message:Type.StatusTypes[100],
                     content: {
                        type:rows[0]['likes'],
                        link:rows[0]['link']
                    }
                 })
 
             })
         })

    }

}