"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts_1 = require("../controllers/posts");
const comment_1 = require("../controllers/comment");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.post('/add', auth_1.default, posts_1.addPost);
router.post('/addG', auth_1.default, posts_1.addGroupPost);
router.post('/like', auth_1.default, posts_1.likePost);
router.post('/register', auth_1.default, posts_1.registerPost);
router.get('/registered', auth_1.default, posts_1.getRegisteredPost);
router.get('/group', auth_1.default, posts_1.getGroupPost);
router.get('/public', auth_1.default, posts_1.getPublicPost);
router.get('/comment', auth_1.default, comment_1.getComment);
module.exports = router;
