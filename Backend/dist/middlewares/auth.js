"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Type = __importStar(require("../models/types"));
const token_1 = require("../utils/token");
const verifyJwt = (req, res, next) => {
    const { VAToken } = req.cookies;
    if (!VAToken) {
        res.status(400).json({
            status: 203,
            message: Type.StatusTypes[203],
            content: {}
        });
        return;
    }
    //   const token = authHeader.split(" ")[1];
    let verif_out = (0, token_1.verifyJWT)(VAToken);
    if (verif_out.payload == null) {
        res.status(403).json({
            status: 203,
            message: Type.StatusTypes[203],
            content: {}
        });
        return;
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
    let payload = verif_out.payload;
    req.params.user_id = `${payload.id}`;
    req.params.email = `${payload.email}`;
    req.params.user_tag = `${payload.user_tag}`;
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
exports.default = verifyJwt;
