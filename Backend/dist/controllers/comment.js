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
exports.likeComment = exports.getComment = exports.addComment = void 0;
const Type = __importStar(require("../models/types"));
const tags_1 = require("../models/tags");
const response_1 = require("../utils/response");
const likes_1 = require("../models/likes");
const comments_1 = require("../models/comments");
const addComment = async (req, res) => {
    const { tag, content, post_id, parent_comment } = req.body;
    if (!tag || !content || !post_id) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                exemple: {
                    tag: "@xyz",
                    content: "test content",
                    post_id: -1,
                    parent_comment: -1
                }
            }
        });
        return;
    }
    let comment_obj = new comments_1.Comment();
    let tag_obj = new tags_1.Tags();
    //check tag 
    let tag_response = await tag_obj.getTag(tag);
    tag_obj.close;
    if (!(0, response_1.checkResponse)(tag_response, res))
        return;
    const { id, type } = tag_response.content;
    if (type != Type.TagTypes.USER) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: "Wrong tag type: " + tag
        });
        return;
    }
    let comment_response = await comment_obj.add(id, post_id, content, parent_comment || -1);
    comment_obj.close();
    if (!(0, response_1.checkResponse)(comment_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.addComment = addComment;
const getComment = async (req, res) => {
    const { post_id } = req.query;
    if (!post_id) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                exemple: {
                    post_id: 1
                }
            }
        });
        return;
    }
    let comment_obj = new comments_1.Comment();
    let comment_response = await comment_obj.get(parseInt(post_id));
    comment_obj.close;
    if (!(0, response_1.checkResponse)(comment_response, res))
        return;
    let comment_list = [];
    let { comments } = comment_response.content;
    for (let x of comments) {
        comment_list.push(x[1]);
    }
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: comment_list
    });
};
exports.getComment = getComment;
const likeComment = async (req, res) => {
    const { tag, context_id } = req.body;
    if (!tag || !context_id) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {}
        });
        return;
    }
    let like_obj = new likes_1.Like();
    let tag_obj = new tags_1.Tags();
    let tag_response = await tag_obj.getTag(tag);
    if (!(0, response_1.checkResponse)(tag_response, res))
        return;
    const { id, type } = tag_response.content;
    if (type != Type.TagTypes.USER) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: "Wrong tag type: " + tag
        });
        return;
    }
    let like_response = await like_obj.like(context_id, id, Type.LikeType.COMMENT);
    if (!(0, response_1.checkResponse)(like_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.likeComment = likeComment;
