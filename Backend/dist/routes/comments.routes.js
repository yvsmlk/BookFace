"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const comment_1 = require("../controllers/comment");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.post('/add', auth_1.default, comment_1.addComment);
router.post('/like', auth_1.default, comment_1.likeComment);
// router.get('/',)
module.exports = router;
