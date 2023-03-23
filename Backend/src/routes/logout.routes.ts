import express from 'express';
const router = express.Router();
import { logout } from '../controllers/logout';

router.get('/',logout)


module.exports = router