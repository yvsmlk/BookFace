import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as Type from "../models/types";

const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
  const {VAToken} = req.cookies;

  

  if (!VAToken) {
    res.status(400).json(
        {
            status:200,
            message:Type.StatusTypes[200],
            content: {}
        }
    )
    return;
  }
  
  next();
  

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.ACCESS_TOKEN_S as string, (err, decoded) => {
//     if (err) {
//       res.status(403).json("Invalid token");
//       return;
//     }

//     // req.email = decoded.email;
//     console.log("Check succeeded");
//     next();
//   });
};

export default verifyJwt;




