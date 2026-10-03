import { LIMITES, Recomendacao } from "../../Clima/models/recomendacao.model.js";
import { Peca } from "./peca.model.js";

export class Sugestao {
  static async gerarPorPeriodo(listaPrevisao) {
    const recomendacoes = Recomendacao.agruparPorPeriodo(listaPrevisao);
    const pecas = await Peca.findAll({ where: { limpo: true } });

    const sugestao = recomendacoes.map((recomendacao) => {
      const pecasSugeridas = Sugestao.filtrarPecas(recomendacao, pecas);

      return {
        periodo: recomendacao.periodo,
        sensacaoMin: recomendacao.sensacaoMin,
        sensacaoMax: recomendacao.sensacaoMax,
        roupasTexto: recomendacao.roupas,
        roupas: pecasSugeridas,
      };
    });

    return sugestao;
  }

  // Cada necessidade adiciona peças à sugestão (como em Recomendacao.definirRoupas),
  // em vez de exigir que uma única peça atenda a todas ao mesmo tempo
  static filtrarPecas(recomendacao, pecas) {
  const precisaQuente = recomendacao.sensacaoMin < LIMITES.frio;
  const precisaImpermeavel = recomendacao.chuva >= LIMITES.chuva;
  const precisaProtegeVento = recomendacao.vento >= LIMITES.vento;

  return pecas.filter((peca) => {
    if (peca.quente !== precisaQuente) return false;
    if (precisaImpermeavel && !peca.impermeavel && !peca.protegeVento) return false;
    if (precisaProtegeVento && !peca.protegeVento && !peca.impermeavel) return false;

    return true;
  });
}
}
