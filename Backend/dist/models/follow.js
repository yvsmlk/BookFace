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
exports.Follow = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const Type = __importStar(require("./types"));
class Follow extends dbConnect_1.default {
    constructor() {
        super();
    }
    async getFollowers(u_tag) {
        let followers_query = `
        SELECT T.tag, 
        T.context_id, 
        COALESCE(M.link, 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png') AS link
        FROM bf_userfollow UF
        left join bf_tags FT on FT.context_id = UF.user_id
        left join bf_users U on U.id = UF.follower_id
        left join bf_media M on M.id = U.picture 
        left join bf_tags T on T.context_id = UF.follower_id
        where FT.tag = '${u_tag}'
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(followers_query, (err, rows, fields) => {
                if (err) {
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
                    content: rows
                });
            });
        });
    }
    async getFollows(u_tag) {
        let follows_query = `
        SELECT T.tag, 
        T.context_id, 
        COALESCE(M.link, 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png') AS link
        FROM bf_userfollow UF
        left join bf_tags FT on FT.context_id = UF.follower_id
        left join bf_users U on U.id = UF.user_id
        left join bf_media M on M.id = U.picture 
        left join bf_tags T on T.context_id = UF.user_id
        where FT.tag = '${u_tag}'
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(follows_query, (err, rows, fields) => {
                if (err) {
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
                    content: rows
                });
            });
        });
    }
    async follow(u_tag, follower_tag) {
        let follow_query = `
            insert into bf_userfollow (user_id,follower_id)
            select T.context_id as user_id,T1.context_id as follower_id from bf_tags T
            cross join bf_tags T1 on T1.tag = '${follower_tag}'
            where T.tag= '${u_tag}'
            ON DUPLICATE KEY UPDATE do_delete = true;
        `;
        let unfollow_query = `
            DELETE FROM bf_userfollow
            WHERE do_delete = true;
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(follow_query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                this.connection.query(unfollow_query, (err, rows, fields) => {
                    if (err) {
                        resolve({
                            status: 404,
                            message: Type.StatusTypes[404],
                            content: { error: err }
                        });
                        return;
                    }
                });
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
    async suggest(u_tag) {
        let follows_query = `
        SELECT DISTINCT T.tag, 
        T.context_id, 
        COALESCE(M.link, 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png') AS link
        FROM bf_tags T
        left join bf_users U on U.id = T.context_id
        left join bf_media M on M.id = U.picture 
        where T.tag not in (
            SELECT  FT.tag
            FROM bf_tags T2 
            right join bf_userfollow UF on UF.follower_id = T2.context_id
            left join bf_tags FT on FT.context_id = UF.user_id
            WHERE T2.tag = '${u_tag}'
        ) and T.type = 'USER' and T.tag != '${u_tag}'
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(follows_query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                console.log(rows);
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: rows
                });
            });
        });
    }
}
exports.Follow = Follow;
