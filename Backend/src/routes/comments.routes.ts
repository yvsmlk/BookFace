import express from 'express';
const router = express.Router();
import { addComment, likeComment } from '../controllers/comment';
import verifyJwt from '../middlewares/auth';


router.post('/add',verifyJwt,addComment)
router.post('/like',verifyJwt,likeComment)

// router.get('/',)


module.exports = router