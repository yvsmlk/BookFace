import express from 'express';
const router = express.Router();
import { logout } from '../controllers/logout';

router.post('/',logout)


module.exports = router