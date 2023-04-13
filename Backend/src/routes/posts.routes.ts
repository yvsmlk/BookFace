import express from 'express';
const router = express.Router();
import { addPost,addGroupPost,likePost,registerPost, getGroupPost,getRegisteredPost,getPublicPost } from '../controllers/posts';
import { getComment } from '../controllers/comment';

router.post('/add',addPost)
router.post('/addG',addGroupPost)

router.post('/like',likePost)
router.post('/register',registerPost)



router.get('/registered',getRegisteredPost)
router.get('/group',getGroupPost)
router.get('/public',getPublicPost)
router.get('/comment',getComment)


module.exports = router