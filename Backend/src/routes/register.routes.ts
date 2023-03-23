import express from 'express';
const router = express.Router();
import { register } from '../controllers/register';

router.get('/',register)


module.exports = router