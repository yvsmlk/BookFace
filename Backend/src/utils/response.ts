
import * as Type from "../models/types";
import {  Response } from "express";

export const checkResponse = (response:Type.ResponseMsg, res:Response):boolean=>{
    if (response.status != 100){
        res.status(400).json(
            {
                status:response.status,
                message:response.message,
                content: response.content
            }
        )
        return false
    }
    return true
}