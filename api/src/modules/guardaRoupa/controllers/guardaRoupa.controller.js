import { Peca } from "../models/peca.model.js";

export async function cadastrarPeca(req, res) {
    try {
        const peca = await Peca.create(req.body);
        res.status(201).json(peca);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao cadastrar peça" });
    }
}

export async function listarPecas(req, res) {
    try {
        const pecas = await Peca.findAll();
        res.status(200).json(pecas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar peças" });
    }
}

export async function atualizarPeca(req, res) {
    try {
        const peca = await Peca.findByPk(req.params.id);
        if (!peca) {
            return res.status(404).json({ error: "Peça não encontrada" });
        }

        await peca.update(req.body);
        res.status(200).json(peca);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao atualizar peça" });
    }
}

export async function deletarPeca(req, res) {
    try {
        const peca = await Peca.findByPk(req.params.id);
        if (!peca) {
            return res.status(404).json({ error: "Peça não encontrada" });
        }

        await peca.destroy();
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar peça" });
    }
}
