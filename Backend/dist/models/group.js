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
exports.Group = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const time_1 = require("../utils/time");
const random_1 = require("../utils/random");
const Type = __importStar(require("./types"));
const tags_1 = require("./tags");
class Group extends dbConnect_1.default {
    constructor() {
        super();
    }
    async get(name) {
        let sql_get_user = `
        SELECT * FROM bf_grouplist
        WHERE name = '${name}'
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
                        content: { name: name }
                    });
                    return;
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {
                        id: rows[0]['id'],
                        user_id: rows[0]['user_id'],
                        name: rows[0]['name'],
                        created_at: rows[0]['created_at']
                    }
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
    create = async (name, creator_id) => {
        return new Promise(async (resolve, reject) => {
            let timestamp = (0, time_1.getTimeStamp)();
            let res_tag = await this.findRandomTag('@' + name, 0);
            if (res_tag.status != 100) {
                resolve({
                    status: 200,
                    message: Type.StatusTypes[200],
                    content: {}
                });
                return;
            }
            let { tagname } = res_tag.content;
            let sql_register = `
            INSERT INTO bf_grouplist (user_id,name,created_at)
            VALUES('${creator_id}','${name}',TIMESTAMP('${timestamp}','0:0:0'))
            `;
            console.log("TAG1");
            if (!tagname) {
                resolve({
                    status: 400,
                    message: Type.StatusTypes[400],
                    content: {}
                });
                return;
            }
            console.log("TAG11");
            this.connection.query(sql_register, async (err, rows, fields) => {
                if (err) {
                    let { code } = err;
                    if (code == 'ER_DUP_ENTRY') {
                        resolve({
                            status: 200,
                            message: Type.StatusTypes[200],
                            content: { name: name }
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
                console.log("TAG2");
                let group = await this.get(name);
                if (group.status != 100) {
                    resolve({
                        status: group.status,
                        message: group.message,
                        content: group.content
                    });
                    return;
                }
                let { id } = group.content;
                console.log("TAG3");
                let tag = new tags_1.Tags();
                tag.addTag(id, "@" + name, Type.TagTypes.GROUP);
                tag.close();
                console.log("TAG4");
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
                return;
            });
        });
    };
    join = async (u_tag, gp_tag) => {
        let query_join = `
        INSERT INTO bf_usergroup (user_id, group_id) 
        select T.context_id as user_id ,T1.context_id as group_id from bf_tags T
        cross join bf_tags T1 on T1.tag = '${gp_tag}'
        where T.tag= '${u_tag}'
        ON DUPLICATE KEY UPDATE do_delete = true;
        `;
        let query_leave = `
        DELETE FROM bf_usergroup
        WHERE do_delete = true;
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(query_join, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                this.connection.query(query_leave, (err, rows, fields) => {
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
    };
    getMembers = async (gp_tag) => {
    };
    suggestionGroup = async (u_tag) => {
    };
}
exports.Group = Group;
