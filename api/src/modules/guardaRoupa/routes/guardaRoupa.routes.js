import { Router } from "express";
import {
  cadastrarPeca,
  listarPecas,
  atualizarPeca,
  deletarPeca,
  gerarSugestao,
} from "../controllers/guardaRoupa.controller.js";
import { autenticar } from "../../auth/middlewares/autenticar.middleware.js";

const router = Router();

router.use(autenticar);

router.post("/pecas", cadastrarPeca);
router.get("/pecas", listarPecas);
router.put("/pecas/:id", atualizarPeca);
router.delete("/pecas/:id", deletarPeca);
router.get("/sugestoes", gerarSugestao);

export default router;