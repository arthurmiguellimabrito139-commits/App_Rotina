import { buscarClima } from "../services/openMeteo.service.js";
import { Previsao } from "../models/previsao.model.js";
import { Recomendacao } from "../models/recomendacao.model.js";
import { lerCoordenadas } from "../utils/coordenadas.js";

export async function obterClima(req, res) {
  const coordenadas = lerCoordenadas(req.query);

  if (!coordenadas) {
    return res.status(400).json({ erro: "Informe lat e lon válidos." });
  }

  try {
    const dados = await buscarClima(coordenadas.lat, coordenadas.lon);
    const lista = Previsao.montarLista(dados);
    const recomendacoes = Recomendacao.agruparPorPeriodo(lista);

    res.json(recomendacoes);
  } catch (erro) {
    console.error(erro);
    res.status(502).json({ erro: "Não foi possível obter o clima." });
  }
}