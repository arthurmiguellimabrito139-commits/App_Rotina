import { buscarClima } from "./src/modules/clima/services/openMeteo.service.js";
import { Previsao } from "./src/modules/clima/models/previsao.model.js";
import { Recomendacao } from "./src/modules/clima/models/recomendacao.model.js";

const dados = await buscarClima(-16.68, -49.25);

const lista = Previsao.montarLista(dados);
const recomendacoes = Recomendacao.agruparPorPeriodo(lista);

console.log(lista[0]);
console.log(lista.length);
console.log(recomendacoes);