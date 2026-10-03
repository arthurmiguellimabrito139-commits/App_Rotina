import { Router } from "express";
import {
  cadastrarPeca,
  listarPecas,
  atualizarPeca,
  deletarPeca,
  gerarSugestao,
} from "../controllers/guardaRoupa.controller.js";

const router = Router();

router.post("/pecas", cadastrarPeca);
router.get("/pecas", listarPecas);
router.put("/pecas/:id", atualizarPeca);
router.delete("/pecas/:id", deletarPeca);
router.get("/sugestoes", gerarSugestao);

export default router;