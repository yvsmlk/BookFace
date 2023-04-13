"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_1 = require("../controllers/posts");
const comment_1 = require("../controllers/comment");
router.post('/add', posts_1.addPost);
router.post('/addG', posts_1.addGroupPost);
router.post('/like', posts_1.likePost);
router.post('/register', posts_1.registerPost);
router.get('/registered', posts_1.getRegisteredPost);
router.get('/group', posts_1.getGroupPost);
router.get('/public', posts_1.getPublicPost);
router.get('/comment', comment_1.getComment);
module.exports = router;
