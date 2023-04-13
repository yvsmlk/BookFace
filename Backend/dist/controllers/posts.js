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
exports.likePost = exports.getPublicPost = exports.getRegisteredPost = exports.getGroupPost = exports.registerPost = exports.addGroupPost = exports.addPost = void 0;
const posts_1 = require("../models/posts");
const Type = __importStar(require("../models/types"));
const tags_1 = require("../models/tags");
const response_1 = require("../utils/response");
const likes_1 = require("../models/likes");
const addPost = async (req, res) => {
    //TODO
    const { tag, content, media } = req.body;
    if (!tag || !content) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                exemple: {
                    tag: "@xyz",
                    content: "test content",
                    media: 0
                }
            }
        });
        return;
    }
    let post_obj = new posts_1.Post();
    let tag_obj = new tags_1.Tags();
    //check tag 
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
    let post_response = await post_obj.add(id, content, media || 0);
    if (!(0, response_1.checkResponse)(post_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.addPost = addPost;
const addGroupPost = async (req, res) => {
    //TODO
    const { user_tag, group_tag, content, media } = req.body;
    if (!user_tag || !group_tag || !content) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                exemple: {
                    user_tag: "@xyz",
                    group_tag: "@xyz",
                    content: "test content",
                    media: 0
                }
            }
        });
        return;
    }
    let post_obj = new posts_1.Post();
    let tag_obj = new tags_1.Tags();
    //check tag 
    let user_tag_response = await tag_obj.getTag(user_tag);
    let group_tag_response = await tag_obj.getTag(group_tag);
    if (!(0, response_1.checkResponse)(user_tag_response, res))
        return;
    if (!(0, response_1.checkResponse)(group_tag_response, res))
        return;
    let uinfo = user_tag_response.content;
    if (uinfo.type != Type.TagTypes.USER) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: "Wrong tag type: " + user_tag
        });
        return;
    }
    let ginfo = group_tag_response.content;
    if (ginfo.type != Type.TagTypes.GROUP) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: "Wrong tag type: " + group_tag
        });
        return;
    }
    let post_response = await post_obj.addGroupPost(ginfo.id, uinfo.id, content, media || 0);
    if (!(0, response_1.checkResponse)(post_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.addGroupPost = addGroupPost;
const registerPost = async (req, res) => {
    //TODO
    const { user_tag, posts_id } = req.body;
    if (!user_tag || !posts_id) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                exemple: {
                    user_tag: "@xyz",
                    posts_id: 2
                }
            }
        });
        return;
    }
    let post_obj = new posts_1.Post();
    let tag_obj = new tags_1.Tags();
    //check tag 
    let user_tag_response = await tag_obj.getTag(user_tag);
    if (!(0, response_1.checkResponse)(user_tag_response, res))
        return;
    let uinfo = user_tag_response.content;
    if (uinfo.type != Type.TagTypes.USER) {
        res.status(400).json({
            status: 401,
            message: Type.StatusTypes[401],
            content: "Wrong tag type: " + user_tag
        });
        return;
    }
    let post_response = await post_obj.register(uinfo.id, posts_id);
    if (!(0, response_1.checkResponse)(post_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.registerPost = registerPost;
const getGroupPost = async (req, res) => {
    const { group_tag, order, n } = req.query;
    console.log(group_tag);
    if (!group_tag) {
        // group post
        res.status(400).json({
            status: 201,
            message: Type.StatusTypes[201],
            content: {
                exemple: 'host/posts/group?group_tag=@xyz&order=LATEST&n=5'
            }
        });
        return;
    }
    let post_obj = new posts_1.Post();
    let limit = n == undefined ? 5 : parseInt(n);
    let post_response = await post_obj.select(group_tag, (order || 'LATEST'), 'GROUP', isNaN(limit) ? 5 : limit);
    post_obj.close();
    if (!(0, response_1.checkResponse)(post_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: post_response.content
    });
};
exports.getGroupPost = getGroupPost;
const getRegisteredPost = async (req, res) => {
    const { user_tag, n, order } = req.query;
    if (!user_tag) {
        res.status(400).json({
            status: 201,
            message: Type.StatusTypes[201],
            content: {
                example: 'host/posts/registered?user_tag=@xyz&order=LATEST&n=5'
            }
        });
        return;
    }
    let post_obj = new posts_1.Post();
    let limit = n == undefined ? 5 : parseInt(n);
    let post_response = await post_obj.select(user_tag, (order || 'LATEST'), 'USER', isNaN(limit) ? 5 : limit);
    post_obj.close();
    if (!(0, response_1.checkResponse)(post_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: post_response.content
    });
};
exports.getRegisteredPost = getRegisteredPost;
const getPublicPost = async (req, res) => {
    const { n, order } = req.query;
    let post_obj = new posts_1.Post();
    let limit = n == undefined ? 5 : parseInt(n);
    let post_response = await post_obj.select("", (order || 'LATEST'), 'PUBLIC', isNaN(limit) ? 5 : limit);
    post_obj.close();
    if (!(0, response_1.checkResponse)(post_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: post_response.content
    });
};
exports.getPublicPost = getPublicPost;
const likePost = async (req, res) => {
    const { tag, context_id } = req.body;
    if (!tag || !context_id) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                example: {
                    tag: "@xyz",
                    context_id: "test content"
                }
            }
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
    let like_response = await like_obj.like(context_id, id, Type.LikeType.POST);
    if (!(0, response_1.checkResponse)(like_response, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.likePost = likePost;
