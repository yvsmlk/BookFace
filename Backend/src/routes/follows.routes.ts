import express from 'express';
const router = express.Router();
import { getFollows, getFollowers, follow, suggest } from '../controllers/follow';
import verifyJwt from '../middlewares/auth';


router.get('/follow',verifyJwt,follow)
router.get('/follows',verifyJwt,getFollows)
router.get('/followers',verifyJwt,getFollowers)
router.get('/suggest',verifyJwt,suggest)

module.exports = router