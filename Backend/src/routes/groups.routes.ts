import express from 'express';
const router = express.Router();
import { join, create } from '../controllers/group';
import verifyJwt from '../middlewares/auth';


router.get('/create',verifyJwt,create)
router.get('/join',verifyJwt,join)

module.exports = router