"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const group_1 = require("../controllers/group");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.get('/create', auth_1.default, group_1.create);
router.get('/join', auth_1.default, group_1.join);
module.exports = router;
