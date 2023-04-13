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
exports.Like = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const Type = __importStar(require("./types"));
class Like extends dbConnect_1.default {
    constructor() {
        super();
    }
    async like(context_id, user_id, type = Type.LikeType.POST) {
        let like_query = `
         INSERT INTO bf_likes (type,user_id,context_id)
         VALUES ("${type}",${user_id},${context_id})
         ON DUPLICATE KEY UPDATE do_delete = true;
        `;
        let del_query = `
         DELETE FROM bf_likes
         WHERE do_delete = true;
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(like_query, (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 404,
                        message: Type.StatusTypes[404],
                        content: { error: err }
                    });
                    return;
                }
                this.connection.query(del_query, (err, rows, fields) => {
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
    async get(context_id) {
        let like_query = `
            select count(*) as likes from bf_likes
            where context_id = ${context_id}
        `;
        return new Promise(async (resolve, reject) => {
            this.connection.query(like_query, (err, rows, fields) => {
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
                    content: { likes: rows[0]['likes'] }
                });
            });
        });
    }
}
exports.Like = Like;
