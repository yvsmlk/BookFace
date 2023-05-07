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
exports.User = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const time_1 = require("../utils/time");
const random_1 = require("../utils/random");
const Type = __importStar(require("./types"));
const sessions_1 = require("./sessions");
const tags_1 = require("./tags");
class User extends dbConnect_1.default {
    /*
    
    CREATE TABLE users (
        id int PRIMARY KEY AUTO_INCREMENT ,
        banner int DEFAULT 0,
        picture int DEFAULT 1,
        username VARCHAR(100),
        email VARCHAR(100) not null,
        pwd VARCHAR(100) not null,
        status int DEFAULT 0,
        created_at datetime not null
    );
    
    */
    constructor() {
        super();
    }
    async getById(user_id) {
        let userCheck_query = `
        SELECT * FROM bf_users
        WHERE id = ${user_id}
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(userCheck_query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: {}
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
    async getTag(tag) {
        let query = `
        SELECT * FROM bf_tags WHERE tag = '${tag}' 
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: {}
                    });
                    console.log(err);
                    return;
                }
                if (rows.length > 0) {
                    resolve({
                        status: 200,
                        message: Type.StatusTypes[200],
                        content: {}
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
    async getProfile(tag) {
        let query = this.PROFILE_QUERY(tag);
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, rows, fields) => {
                if (err || rows.length == 0) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: {}
                    });
                    console.log(err);
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {
                        tag: rows[0]['tag'],
                        avatar: rows[0]['avatar'],
                        email: rows[0]['email'],
                        username: rows[0]['username'],
                        followers: rows[0]['followers'] || 0,
                        follows: rows[0]['follows'] || 0,
                        status: rows[0]['status'] || 0,
                        banner: rows[0]['banner'],
                        created_at: rows[0]['created_at'],
                    }
                });
            });
        });
    }
    findRandomTag = async (tagAttempt, attemptLeft = 5) => {
        let current = tagAttempt || (0, random_1.randomTag)();
        let output = await this.getTag(current);
        if (current.length < 4 || output.status != 100) {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 404,
                    message: Type.StatusTypes[400],
                    content: {}
                });
            });
        }
        if (output.status != 100 && attemptLeft == 0) {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 404,
                    message: Type.StatusTypes[400],
                    content: {}
                });
            });
        }
        if (output.status == 100) {
            return new Promise((resolve, reject) => {
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: { tagname: current }
                });
            });
        }
        else {
            return this.findRandomTag("", attemptLeft - 1);
        }
    };
    async changeTag(old_tag, new_tag) {
        // let resp_tag = await this.findRandomTag(new_tag,0)
        return new Promise(async (resolve, reject) => {
            let tag = new tags_1.Tags();
            let tagRes = await tag.updateTag(old_tag, new_tag);
            tag.close();
            if (tagRes.status != 100) {
                resolve({
                    status: tagRes.status,
                    message: tagRes.message,
                    content: tagRes.content
                });
            }
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: {}
            });
        });
    }
    async register(email, pwd) {
        let timestamp = (0, time_1.getTimeStamp)();
        let hashedPWD = await bcrypt_1.default.hash(pwd, 10);
        // verify uniqueness of the timestamp return status accordingly 
        let { tagname } = (await this.findRandomTag("", 0)).content;
        let sql_register = `
        INSERT INTO bf_users (email,pwd,created_at)
        VALUES('${email}','${hashedPWD}',TIMESTAMP('${timestamp}','0:0:0'))
        `;
        return new Promise((resolve, reject) => {
            if (!tagname) {
                resolve({
                    status: 202,
                    message: Type.StatusTypes[202],
                    content: {}
                });
                return;
            }
            this.connection.query(sql_register, async (err, rows, fields) => {
                if (err) {
                    let { code } = err;
                    if (code == 'ER_DUP_ENTRY') {
                        resolve({
                            status: 200,
                            message: Type.StatusTypes[200],
                            content: { email: email }
                        });
                        return;
                    }
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
                    });
                    return;
                }
                let tag = new tags_1.Tags();
                let dbUser = await this.getUser(email);
                if (dbUser.status != 100) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: {}
                    });
                    return;
                }
                let { id } = dbUser.content;
                let tagRes = await tag.addTag(id, tagname, Type.TagTypes.USER);
                tag.close();
                if (tagRes.status != 100) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: tagRes.content
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
        // console.log(` Tag: ${tag}, Created_at: ${timestamp}`)
    }
    async getUser(email) {
        let sql_get_user = `
        SELECT * FROM bf_users
        WHERE email = '${email}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_get_user, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
                    });
                    return;
                }
                if (rows.length == 0) {
                    resolve({
                        status: 201,
                        message: Type.StatusTypes[201],
                        content: { email: email }
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {
                        id: rows[0]['id'],
                        banner: rows[0]['banner'],
                        picture: rows[0]['picture'],
                        username: rows[0]['username'],
                        email: rows[0]['email'],
                        status: rows[0]['status'],
                        created_at: rows[0]['created_at'],
                        pwd: rows[0]['pwd']
                    }
                });
            });
        });
    }
    async removeUser(email) {
        let sql_del_user = `
        DELETE FROM bf_users 
        WHERE email = '${email}'
        `;
        return new Promise(async (resolve, reject) => {
            let { id } = (await this.getUser(email)).content;
            if (!id) {
                resolve({
                    status: 201,
                    message: Type.StatusTypes[201],
                    content: { email: email }
                });
                return;
            }
            let tag = new tags_1.Tags();
            // let tagname = (await tag.getTagById(id,Type.TagTypes.USER)).content
            let del_tag = await tag.deleteTag(id);
            if (del_tag.status != 100) {
                resolve({
                    status: del_tag.status,
                    message: del_tag.message,
                    content: del_tag.content
                });
                return;
            }
            tag.close();
            this.connection.query(sql_del_user, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
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
    async login(email, in_pwd) {
        return new Promise(async (resolve, reject) => {
            let session = new sessions_1.Session();
            let dbUser = await this.getUser(email);
            if (dbUser.status != 100) {
                resolve({
                    status: dbUser.status,
                    message: dbUser.message,
                    content: dbUser.content
                });
                return;
            }
            let { id, pwd } = dbUser.content;
            if (!bcrypt_1.default.compareSync(in_pwd, pwd)) {
                resolve({
                    status: 401,
                    message: Type.StatusTypes[401],
                    content: {}
                });
                return;
            }
            let resSession = await session.getSession(id);
            // if ( resSession.status != 201){
            //     resolve({
            //         status:405,
            //         message:Type.StatusTypes[405],
            //         content: {email:email}
            //     })
            //     session.close()
            //     return
            // }
            let delSession = await session.deleteSession(id);
            resSession = await session.addSession(id);
            session.close();
            if (resSession.status != 100) {
                resolve({
                    status: 202,
                    message: Type.StatusTypes[202],
                    content: resSession.content
                });
                return;
            }
            console.log(resSession);
            resSession = await session.getUId(id);
            let content = resSession.content;
            console.log(resSession);
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: {
                    hashedPWD: pwd,
                    user_id: id,
                    user_tag: content[0]['tag'],
                    session_id: content[0]['id']
                }
            });
        });
    }
    //logout based on JWT
    async logout(user_id) {
        return new Promise(async (resolve, reject) => {
            let session = new sessions_1.Session();
            let resSession = await session.deleteSession(user_id);
            session.close();
            if (resSession.status != 100) {
                resolve({
                    status: 202,
                    message: Type.StatusTypes[202],
                    content: resSession.content
                });
                return;
            }
            resolve({
                status: 100,
                message: Type.StatusTypes[100],
                content: {}
            });
        });
    }
    PROFILE_QUERY = (u_tag) => {
        return `
        SELECT 
        UTags.tag, 
        Media.link AS avatar,
        U.email,
        U.username,
        U.status,
        U.banner,
        U.created_at,
        FTable.followers,
        FTable.follows
        FROM bf_tags UTags
        LEFT JOIN bf_users U ON U.id = UTags.context_id
        LEFT JOIN bf_media Media ON Media.id = U.picture
        CROSS JOIN (
            SELECT
                SUM(CASE WHEN user_id = T.context_id THEN 1 ELSE 0 END) AS followers,
                SUM(CASE WHEN follower_id = T.context_id THEN 1 ELSE 0 END) AS follows
            FROM bf_userfollow
            CROSS JOIN (
                SELECT context_id FROM bf_tags WHERE tag = '${u_tag}' AND type = 'USER'
            ) T
        ) FTable
        WHERE UTags.tag = '${u_tag}' AND UTags.type = 'USER';
        `;
    };
}
exports.User = User;
