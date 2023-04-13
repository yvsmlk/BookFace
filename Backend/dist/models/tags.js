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
exports.Tags = void 0;
const dbConnect_1 = __importDefault(require("./dbConnect"));
const Type = __importStar(require("./types"));
class Tags extends dbConnect_1.default {
    /*
    
    CREATE TABLE tags (
        id int PRIMARY KEY AUTO_INCREMENT ,
        context_id int not null,
        tag VARCHAR(100),
        type VARCHAR(100)
    );
    
    */
    constructor() {
        super();
    }
    getTag(tag) {
        //
        let sql_get_session = `
        SELECT * FROM bf_tags
        WHERE tag = '${tag}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_get_session, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
                    });
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
                    content: {
                        id: rows[0]["context_id"],
                        tag: rows[0]["tag"],
                        type: rows[0]["type"]
                    }
                });
            });
        });
    }
    getTagById(id, type) {
        //
        let sql_get_session = `
        SELECT * FROM bf_tags
        WHERE context_id = '${id}' AND type = '${type}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_get_session, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
                    });
                    console.log(err);
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
                    content: {
                        id: rows[0]["context_id"],
                        tag: rows[0]["tag"],
                        type: rows[0]["type"]
                    }
                });
            });
        });
    }
    addTag(user_id, tag, type) {
        //
        let sql_add_session = `
        INSERT INTO bf_tags (context_id,tag,type)
        VALUES('${user_id}', '${tag}','${type}')
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_add_session, async (err, rows, fields) => {
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
    deleteTag(id) {
        let sql_del_session = `
        DELETE FROM bf_tags 
        WHERE context_id = '${id}'
        `;
        return new Promise((resolve, reject) => {
            this.connection.query(sql_del_session, async (err, rows, fields) => {
                if (err) {
                    resolve({
                        status: 202,
                        message: Type.StatusTypes[202],
                        content: { error: err }
                    });
                }
                resolve({
                    status: 100,
                    message: Type.StatusTypes[100],
                    content: {}
                });
            });
        });
    }
}
exports.Tags = Tags;
