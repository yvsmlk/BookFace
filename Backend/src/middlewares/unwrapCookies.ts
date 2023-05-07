import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../models/types";
import { verifyJWT } from "../utils/token";
import { Session } from "../models/sessions";
import { Tags } from "../models/tags";

const unwrapCookies =async (req: Request, res: Response, next: NextFunction) => {
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
    user_tag: string,
    session_id : number
  }
  
  req.params.user_id = `${payload.id}`
  req.params.email = `${payload.email}`

  
  next();

};

export default unwrapCookies;




