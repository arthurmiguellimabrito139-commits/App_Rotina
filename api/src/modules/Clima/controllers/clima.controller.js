import { buscarClima } from "../services/openMeteo.service.js";
import { Previsao } from "../models/previsao.model.js";
import { Recomendacao } from "../models/recomendacao.model.js";

export async function obterClima(req, res) {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return res.status(400).json({ erro: "Informe lat e lon válidos." });
  }

  try {
    const dados = await buscarClima(lat, lon);
    const lista = Previsao.montarLista(dados);
    const recomendacoes = Recomendacao.agruparPorPeriodo(lista);

    res.json(recomendacoes);
  } catch (erro) {
    console.error(erro);
    res.status(502).json({ erro: "Não foi possível obter o clima." });
  }
}