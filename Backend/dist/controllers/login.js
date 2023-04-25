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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.login = void 0;
const user_1 = require("../models/user");
const token_1 = require("../utils/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Type = __importStar(require("../models/types"));
const basicConnect = async (email, pwd, hashedPwd, id, user_tag, req, res) => {
    if (bcrypt_1.default.compareSync(pwd, hashedPwd)) {
        const accessToken = (0, token_1.signJWT)({ "email": email, "id": id, "user_tag": user_tag }, process.env.ACCESS_TOKEN_TTL || '1d');
        const refreshToken = (0, token_1.signJWT)({ "email": email, "id": id, "user_tag": user_tag }, process.env.REFRESH_TOKEN_TTL || '1d');
        try {
            // await user.update("",0,refreshToken)
            // res.cookie("VRToken",refreshToken,{httpOnly:true,maxAge:24*60*60*1000, sameSite:"none" ,secure:true})
            // res.cookie("VAToken",accessToken,{httpOnly:true,maxAge:20*60*1000, sameSite:"none" ,secure:true})
            res.cookie("VRToken", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none" });
            res.cookie("VAToken", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "none" });
            res.status(200).json({
                status: 100,
                message: Type.StatusTypes[100],
                content: {}
            });
        }
        catch (error) {
            res.status(400).json({
                status: 404,
                message: Type.StatusTypes[404],
                content: {}
            });
        }
    }
    else {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: {}
        });
        return;
    }
};
const login = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
        res.status(400).json({
            status: 404,
            message: Type.StatusTypes[404],
            content: {}
        });
        return;
    }
    let user = new user_1.User();
    let resp = await user.login(email, pwd);
    user.close();
    if (resp.status != 100) {
        res.status(400).json({
            status: resp.status,
            message: resp.message,
            content: {}
        });
        return;
    }
    console.log(resp);
    let { hashedPWD, user_id, user_tag } = resp.content;
    basicConnect(email, pwd, hashedPWD, user_id, user_tag, req, res);
};
exports.login = login;
const auth = async (req, res) => {
    let { user_id } = req.params;
    if (!user_id) {
        res.status(403).json({
            status: 403,
            message: Type.StatusTypes[403],
            content: {}
        });
        return;
    }
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.auth = auth;
