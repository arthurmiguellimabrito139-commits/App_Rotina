import { Router } from "express";
import {
  cadastrarPeca,
  listarPecas,
  atualizarPeca,
  deletarPeca,
} from "../controllers/guardaRoupa.controller.js";

const router = Router();

router.post("/pecas", cadastrarPeca);
router.get("/pecas", listarPecas);
router.put("/pecas/:id", atualizarPeca);
router.delete("/pecas/:id", deletarPeca);

export default router;