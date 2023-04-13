"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_1 = require("./models/comments");
const posts_1 = require("./models/posts");
// import path from 'path'
// import dotenv from "dotenv";
// let ENV = process.env.ENVIRONNEMENT || ""
// if (ENV == "production"){
//     dotenv.config(
//         { 
//             path: path.join(__dirname, '../.env.production') ,
//             override: true,
//             debug: true
//         }
//     );
//     console.log(process.env.DATABASE_URL || process.cwd())  
// }
// else{
//     dotenv.config(
//         { 
//             path: path.join(__dirname, '../.env') ,
//             override: true,
//             debug: true
//         }
//     );
//     console.log(process.env.DATABASE_URL || process.cwd()) 
// }
let comments = new comments_1.Comment();
let posts = new posts_1.Post();
// posts.select('@user2','LATEST','USER')
// .then(data=>console.log(data))
// posts.addGroupPost(1,225,"Welcom in the test group ")
// .then(data=>console.log(data))
posts.register(225, 5)
    .then(data => console.log(data));
// comments.add(26,1,"test response 1",2)
// .then(data=>console.log(data))
// .catch()
// comments.add(26,1,"test response 2",2)
// .then(data=>console.log(data))
// .catch()
// comments.add(15,1,"test comment 2")
// comments.add(15,1,"test comment 3")
// comments.add(15,1,"test comment 4")
//  comments.get(1)
//  .then(data=>console.log(data))
// .then(data=>console.log(data))
// .catch()
// let tag = new Tags()
// tag.getTag("@dsfsdfsdf")
// .then(res=>console.log(res))
// .catch(err=>console.log(err))
// let user = new User()
// user.register("test@wtest.com","test")
// .then(res=>console.log(res))
// .catch(err=>console.log(err))
