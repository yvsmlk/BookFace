"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Tags } from "./models/tags";
// import { TagTypes } from "./models/types";
// import { User } from "./models/user";
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
let ENV = process.env.ENVIRONNEMENT || "";
if (ENV == "production") {
    dotenv_1.default.config({
        path: path_1.default.join(__dirname, '../.env.production'),
        override: true,
        debug: true
    });
    console.log(process.env.DATABASE_URL || process.cwd());
}
else {
    dotenv_1.default.config({
        path: path_1.default.join(__dirname, '../.env'),
        override: true,
        debug: true
    });
    console.log(process.env.DATABASE_URL || process.cwd());
}
// let tag = new Tags()
// tag.getTag("@dsfsdfsdf")
// .then(res=>console.log(res))
// .catch(err=>console.log(err))
// let user = new User()
// user.register("test@wtest.com","test")
// .then(res=>console.log(res))
// .catch(err=>console.log(err))
