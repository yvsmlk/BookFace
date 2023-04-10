import express from 'express';
const router = express.Router();
import { addPost,likePost } from '../controllers/posts';


router.post('/add',addPost)
router.post('/like',likePost)

// router.get('/',)


module.exports = router