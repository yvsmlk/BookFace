import express from 'express';
const router = express.Router();
import { getProfile } from '../controllers/profile';
import { changeTag } from '../controllers/profile';
import verifyJwt from '../middlewares/auth';


router.get('/',verifyJwt,getProfile)

router.post('/tag/update',verifyJwt,changeTag)

module.exports = router