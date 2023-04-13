import express from 'express';
const router = express.Router();
import { addComment, likeComment } from '../controllers/comment';


router.post('/add',addComment)
router.post('/like',likeComment)

// router.get('/',)


module.exports = router