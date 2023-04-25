"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const follow_1 = require("../controllers/follow");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.get('/follow', auth_1.default, follow_1.follow);
router.get('/follows', auth_1.default, follow_1.getFollows);
router.get('/followers', auth_1.default, follow_1.getFollowers);
router.get('/suggest', auth_1.default, follow_1.suggest);
module.exports = router;
