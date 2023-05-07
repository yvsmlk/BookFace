import express from 'express';
const router = express.Router();
import { logout } from '../controllers/logout';
import verifyJwt from '../middlewares/auth';
import unwrapCookies from '../middlewares/unwrapCookies';

router.post('/',unwrapCookies,logout)


module.exports = router