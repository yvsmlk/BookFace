"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comment_1 = require("../controllers/comment");
router.post('/add', comment_1.addComment);
router.post('/like', comment_1.likeComment);
// router.get('/',)
module.exports = router;
