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
exports.changeTag = exports.getProfile = exports.getPublicProfile = void 0;
const user_1 = require("../models/user");
const Type = __importStar(require("../models/types"));
const tags_1 = require("../models/tags");
const getPublicProfile = async (req, res) => {
    let { u_tag } = req.params;
    if (!u_tag) {
        (0, exports.getProfile)(req, res);
        return;
    }
    let user = new user_1.User();
    let resp = await user.getProfile(u_tag);
    user.close();
    res.status(200).json({
        status: resp.status,
        message: resp.message,
        content: resp.content
    });
};
exports.getPublicProfile = getPublicProfile;
const getProfile = async (req, res) => {
    let user = new user_1.User();
    let resp = await user.getProfile(req.params.user_tag);
    user.close();
    if (resp.status != 100) {
        res.status(400).json({
            status: resp.status,
            message: resp.message,
            content: {}
        });
        return;
    }
    res.status(200).json({
        status: resp.status,
        message: resp.message,
        content: resp.content
    });
};
exports.getProfile = getProfile;
const changeTag = async (req, res) => {
    const { new_tag } = req.body;
    if (!new_tag) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                example: {
                    new_tag: "xyz"
                }
            }
        });
        return;
    }
    let tag = new tags_1.Tags();
    let resp = await tag.updateTag(req.params.user_tag, "@" + new_tag);
    tag.close();
    if (resp.status != 100) {
        res.status(400).json({
            status: resp.status,
            message: resp.message,
            content: resp.content
        });
        return;
    }
    res.status(200).json({
        status: resp.status,
        message: resp.message,
        content: resp.content
    });
};
exports.changeTag = changeTag;
