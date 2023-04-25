"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const media_1 = require("../controllers/media");
const auth_1 = __importDefault(require("../middlewares/auth"));
router.get('/', auth_1.default, media_1.getMedia);
module.exports = router;
