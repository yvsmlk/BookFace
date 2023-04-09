import express from 'express';
const router = express.Router();
 import { addPost,like } from '../controllers/posts';


router.post('/add',addPost)
router.post('/like',like)


module.exports = router