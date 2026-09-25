import {Router} from 'express';
import {obterClima} from '../controllers/clima.controller.js';

const router = Router();

router.get('/', obterClima);

export default router;