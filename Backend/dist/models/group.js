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
    findRandomTag = async (attemptLeft = 5) => {
        let current = (0, random_1.randomTag)();
        let output = await this.getTag(current);
        if (attemptLeft == 0) {
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
            return this.findRandomTag(attemptLeft - 1);
        }
    };
    create = async (name, creator_id) => {
        let timestamp = (0, time_1.getTimeStamp)();
        // verify uniqueness of the timestamp return status accordingly 
        let { tagname } = (await this.findRandomTag()).content;
        let sql_register = `
        INSERT INTO bf_groups (user_id,name,created_at)
        VALUES('${creator_id}','${name}',TIMESTAMP('${timestamp}','0:0:0'))
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
                let tag = new tags_1.Tags();
                let dbUser = await this.get(name);
                tag.close();
                // if (dbUser.status != 100){
                //     resolve({
                //         status:202,
                //         message:Type.StatusTypes[202],
                //         content: {}
                //     })
                //     return
                // }
                // let {id} = dbUser.content as {
                //     id:number
                // }
                // let tagRes = await tag.addTag(id,tagname,Type.TagTypes.USER)
                // tag.close()
                // if ( tagRes.status != 100){
                //     resolve({
                //         status:202,
                //         message:Type.StatusTypes[202],
                //         content: tagRes.content
                //     })
                //     return
                // }
                // resolve({
                //     status:100,
                //     message:Type.StatusTypes[100],
                //     content: {}
                // })
            });
        });
        // console.log(` Tag: ${tag}, Created_at: ${timestamp}`)
    };
}
exports.Group = Group;
