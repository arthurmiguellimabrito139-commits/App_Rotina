import { Previsao } from "../../Clima/models/previsao.model.js";
import { buscarClima } from "../../Clima/services/openMeteo.service.js";
import { lerCoordenadas } from "../../Clima/utils/coordenadas.js";
import { Peca } from "../models/peca.model.js";
import { Sugestao } from "../models/sugestao.model.js";

export async function cadastrarPeca(req, res) {
    try {
        const peca = await Peca.create(req.body);
        res.status(201).json(peca);
    } catch (erro) {
        console.error(erro);
        res.status(400).json({ erro: "Erro ao cadastrar peça" });
    }
}

export async function listarPecas(req, res) {
    try {
        const pecas = await Peca.findAll();
        res.status(200).json(pecas);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao listar peças" });
    }
}

export async function atualizarPeca(req, res) {
    try {
        const peca = await Peca.findByPk(req.params.id);
        if (!peca) {
            return res.status(404).json({ erro: "Peça não encontrada" });
        }

        await peca.update(req.body);
        res.status(200).json(peca);
    } catch (erro) {
        console.error(erro);
        res.status(400).json({ erro: "Erro ao atualizar peça" });
    }
}

export async function deletarPeca(req, res) {
    try {
        const peca = await Peca.findByPk(req.params.id);
        if (!peca) {
            return res.status(404).json({ erro: "Peça não encontrada" });
        }

        await peca.destroy();
        res.status(204).end();
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao deletar peça" });
    }
}

export async function gerarSugestao(req, res) {
    const coordenadas = lerCoordenadas(req.query);

    if (!coordenadas) {
        return res.status(400).json({ erro: "Informe lat e lon válidos." });
    }

    let dados;
    try {
        dados = await buscarClima(coordenadas.lat, coordenadas.lon);
    } catch (erro) {
        console.error(erro);
        return res.status(502).json({ erro: "Não foi possível obter o clima." });
    }

    try {
        const listaPrevisao = Previsao.montarLista(dados);
        const sugestao = await Sugestao.gerarPorPeriodo(listaPrevisao);

        res.status(200).json(sugestao);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao gerar sugestão" });
    }
}
