import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../models/types";
import { verifyJWT } from "../utils/token";
import { Session } from "../models/sessions";

const verifyJwt =async (req: Request, res: Response, next: NextFunction) => {
  const {VAToken} = req.cookies;

  
  if (!VAToken) {
    console.log("no token");
    res.status(400).json(
        {
            status:203,
            message:Type.StatusTypes[203],
            content: {}
        }
    )
    return;
  }
  

//   const token = authHeader.split(" ")[1];

  let verif_out = verifyJWT(VAToken)
  if (verif_out.payload == null){
    console.log("wrong token");
    
    res.status(403).json(
      {
        status:203,
        message:Type.StatusTypes[203],
        content: {}
      }
    );
    return 
  } 

  
  let payload = verif_out.payload as {
    email: string,
    id: number,
    user_tag: string
  }
  let session = new Session()
  let resSession = await session.getSession(payload.id) 
  session.close()
  
    if ( resSession.status != 100){
      console.log("wrong session");
        res.status(403).json(
          {
            status:407,
            message:Type.StatusTypes[407],
            content: {message:"Try reconnecting"}
          }
        );
        
        return
    }
  
  req.params.user_id = `${payload.id}`
  req.params.email = `${payload.email}`
  req.params.user_tag = `${payload.user_tag}`
  
  next();

  // jwt.verify(VAToken, process.env.ACCESS_TOKEN_S as string, (err:any, decoded:any) => {
  //   if (err) {
  //     res.status(403).json(
  //       {
  //         status:203,
  //         message:Type.StatusTypes[203],
  //         content: {err}
  //       }
  //     );
  //     return;
  //   }

  //   // req.email = decoded.email;
  //   console.log(decoded);
  //   next();
  // });
};

export default verifyJwt;




