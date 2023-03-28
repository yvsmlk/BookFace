import { Request, Response } from "express";
import { verifyJWT } from "../utils/token";
import * as Type from "../models/types";
import { User } from "../models/user";

export const logout = async (req:Request, res:Response)=>{

    const { VRToken, VAToken } = req.cookies;
    if (!VAToken) {
        res.status(400).json({
            status:406,
            message:Type.StatusTypes[406],
            content: {}
        })
        return
    }

    const { payload } = verifyJWT(VAToken);
    // For a valid access token
    if (!payload) {
        // @ts-ignore
        res.status(400).json({
            status:405,
            message:Type.StatusTypes[405],
            content: {}
        })
        return
    }

    const {id} = payload as { email: string, id: number, iat: number, exp: number}

    if (!id) {
        // @ts-ignore
        res.status(400).json({
            status:404,
            message:Type.StatusTypes[404],
            content: {}
        })
        return
    }

    let user = new User()
    let resp = await user.logout(id)
    user.close()
    if (resp.status != 100){
        res.status(400).json({
            status:resp.status,
            message:resp.message,
            content: resp.content
        })
    }

    res.status(200).json({
        status:100,
        message:Type.StatusTypes[100],
        content: {}
    })
}