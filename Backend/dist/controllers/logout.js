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
exports.logout = void 0;
const token_1 = require("../utils/token");
const Type = __importStar(require("../models/types"));
const user_1 = require("../models/user");
const logout = async (req, res) => {
    const { VRToken, VAToken } = req.cookies;
    if (!VAToken) {
        res.status(400).json({
            status: 406,
            message: Type.StatusTypes[406],
            content: {}
        });
        return;
    }
    const { payload } = (0, token_1.verifyJWT)(VAToken);
    // For a valid access token
    if (!payload) {
        // @ts-ignore
        res.status(400).json({
            status: 405,
            message: Type.StatusTypes[405],
            content: {}
        });
        return;
    }
    const { id } = payload;
    if (!id) {
        // @ts-ignore
        res.status(400).json({
            status: 404,
            message: Type.StatusTypes[404],
            content: {}
        });
        return;
    }
    let user = new user_1.User();
    let resp = await user.logout(id);
    user.close();
    if (resp.status != 100) {
        res.status(400).json({
            status: resp.status,
            message: resp.message,
            content: resp.content
        });
    }
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.logout = logout;
