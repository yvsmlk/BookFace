import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../models/types";
import { verifyJWT } from "../utils/token";

const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
  const {VAToken} = req.cookies;

  
  if (!VAToken) {
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
    res.status(403).json(
      {
        status:203,
        message:Type.StatusTypes[203],
        content: {}
      }
    );
    return 
  } 

  // let resSession = await session.getSession(id) 

  //   if ( resSession.status != 201){
  //       resolve({
  //           status:405,
  //           message:Type.StatusTypes[405],
  //           content: {email:email}
  //       })
  //       session.close()
  //       return
  //   }

  let payload = verif_out.payload as {
    email: string,
    id: number,
    user_tag: string
  }

  console.log("PAYLOAD",payload);
  

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




