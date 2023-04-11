import express from 'express';
const router = express.Router();
import { addPost,likePost, getGroupPost,getRegisteredPost,getPublicPost } from '../controllers/posts';


router.post('/add',addPost)
router.post('/like',likePost)

router.get('/registered',getRegisteredPost)
router.get('/group',getGroupPost)
router.get('/public',getPublicPost)


module.exports = router