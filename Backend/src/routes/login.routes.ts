import express from 'express';
const router = express.Router();
import { login } from '../controllers/login';

router.get('/',login)


module.exports = router