"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const profile_1 = require("../controllers/profile");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.get('/:u_tag', profile_1.getPublicProfile);
router.get('/', auth_1.default, profile_1.getProfile);
router.post('/tag/update', auth_1.default, profile_1.changeTag);
module.exports = router;
