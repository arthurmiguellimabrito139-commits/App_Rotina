import { Router } from "express";
import { loginUsuario, registrarUsuario } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);

export default router;