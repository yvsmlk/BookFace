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
exports.getMembers = exports.join = exports.create = void 0;
const group_1 = require("../models/group");
const Type = __importStar(require("../models/types"));
const response_1 = require("../utils/response");
const create = async (req, res) => {
    //name:string,creator_id:number
    const { name } = req.query;
    if (!name) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                example: "host/groups/join?name=xyz"
            }
        });
        return;
    }
    let group = new group_1.Group();
    console.log("IN");
    let resp_group = await group.create(name, parseInt(req.params.user_id));
    group.close();
    if (!(0, response_1.checkResponse)(resp_group, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.create = create;
const join = async (req, res) => {
    //u_tag:string ,gp_tag:string
    const { gp_tag } = req.query;
    if (!gp_tag) {
        res.status(400).json({
            status: 400,
            message: Type.StatusTypes[400],
            content: {
                example: "host/groups/join?name=xyz"
            }
        });
        return;
    }
    let group = new group_1.Group();
    let resp_group = await group.join(req.params.user_tag, gp_tag);
    group.close();
    if (!(0, response_1.checkResponse)(resp_group, res))
        return;
    res.status(200).json({
        status: 100,
        message: Type.StatusTypes[100],
        content: {}
    });
};
exports.join = join;
const getMembers = async (req, res) => {
};
exports.getMembers = getMembers;
