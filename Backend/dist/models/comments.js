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
exports.Comment = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const Type = __importStar(require("./types"));
const time_1 = require("../utils/time");
const user_1 = require("./user");
const posts_1 = require("./posts");
class Comment extends dbConnect_1.default {
    /*
    
        CREATE TABLE bf_comments (
        id int PRIMARY KEY AUTO_INCREMENT ,
        user_id int not null,
        post_id int not null,
        parent_comment int,
        content varchar(2048),
        created_at datetime not null,
    );
    
    */
    constructor() {
        super();
    }
    async add(user_id, post_id, content, parent_comment = -1) {
        let timestamp = (0, time_1.getTimeStamp)(); // add TIMESTAMP('${timestamp}','0:0:0' to the query
        let add_query = `
        INSERT INTO bf_comments (user_id,post_id,parent_comment,content,created_at)
        VALUES('${user_id}',${post_id},${parent_comment},'${content}',TIMESTAMP('${timestamp}','0:0:0'))

        `;
        return new Promise(async (resolve, reject) => {
            let user = new user_1.User();
            let userResponse = await user.getById(user_id);
            user.close();
            if (userResponse.status != 100) {
                resolve(userResponse);
                return;
            }
            let post = new posts_1.Post();
            let postResponse = await post.get(post_id);
            post.close();
            if (postResponse.status != 100) {
                resolve(postResponse);
                return;
            }
            this.connection.query(add_query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    transformComment(rows) {
        let comment_map = new Map();
        for (let com of rows) {
            let { id, tag, parent_comment, created_at, content, likes } = com;
            if (parent_comment != -1) {
                let map_item = comment_map.get(parent_comment);
                let resp_com = {
                    id: id,
                    user: tag,
                    content: content,
                    created_at: created_at,
                    likes: likes
                };
                if (!map_item) {
                    comment_map.set(parent_comment, {
                        id: id,
                        user: "",
                        content: "",
                        responses: [resp_com],
                        created_at: "",
                        likes: 0
                    });
                }
                else {
                    map_item.responses.push(resp_com);
                }
            }
            else {
                let com = {
                    id: id,
                    user: tag,
                    content: content,
                    created_at: created_at,
                    responses: [],
                    likes: likes
                };
                comment_map.set(id, com);
            }
        }
        return comment_map;
    }
    async createComments(post_id) {
        // make request here
        let comments_query = `
            SELECT comments.id, tags.tag, comments.parent_comment, comments.created_at, comments.content, COALESCE(likes.likes, 0) AS likes
            FROM bf_comments comments
            LEFT JOIN bf_tags tags ON comments.user_id = tags.context_id
            LEFT JOIN (
                SELECT count(*) as likes, context_id 
                FROM bf_likes
                GROUP BY context_id
            ) likes ON comments.id = likes.context_id 
            WHERE post_id = ${post_id};
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(comments_query, async (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                let comments = this.transformComment(rows);
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: { comments }
                });
            });
        });
    }
    /*
        should return the comment + the list of response
    */
    async get(post_id) {
        return new Promise(async (resolve, reject) => {
            let response = await this.createComments(post_id);
            let comments = response.content;
            if (response.status != 100) {
                resolve({
                    status: response.status,
                    message: response.message,
                    content: {}
                });
            }
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: comments
            });
        });
    }
    // async getSpecific(user_id:number,timestamp:string){
    //     let comment:Type.CommentType = {
    //         user:"@xyz",
    //         content:"",
    //         responses: [],
    //         created_at:"",
    //         likes:0
    //     }
    //     return new Promise<Type.ResponseMsg>((resolve, reject) => {
    //         resolve({
    //             status:100,
    //             message:"TODO",
    //             content: {
    //                 comment: comment
    //             }
    //         })
    //     })
    // }
    async delete(id) {
        return new Promise((resolve, reject) => {
            resolve({
                status: 100,
                message: "TODO",
                content: {}
            });
        });
    }
}
exports.Comment = Comment;
