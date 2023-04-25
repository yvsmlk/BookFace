import express from 'express';
const router = express.Router();
import { addPost,addGroupPost,likePost,registerPost, 
    getGroupPost,getRegisteredPost,getPublicPost , 
    getAllGroupPost,getUserTargetPost} from '../controllers/posts';
import { getComment } from '../controllers/comment';
import verifyJwt from '../middlewares/auth';

router.post('/add',verifyJwt,addPost)
router.post('/addG',verifyJwt,addGroupPost)

router.post('/like',verifyJwt,likePost)
router.post('/register',verifyJwt,registerPost)



router.get('/registered',verifyJwt,getRegisteredPost)
router.get('/group',verifyJwt,getGroupPost)
router.get('/group_all',verifyJwt,getAllGroupPost)
// router.get('/target',verifyJwt,getUserTargetPost)
router.get('/public',verifyJwt,getPublicPost)
router.get('/comment',verifyJwt,getComment)



module.exports = router