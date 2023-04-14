import express from 'express';
const router = express.Router();
import { logout } from '../controllers/logout';
import verifyJwt from '../middlewares/auth';

router.post('/',verifyJwt,logout)


module.exports = router