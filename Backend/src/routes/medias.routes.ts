import express from 'express';
const router = express.Router();
import { getMedia } from '../controllers/media';
import verifyJwt from '../middlewares/auth';


router.get('/',verifyJwt,getMedia)

module.exports = router