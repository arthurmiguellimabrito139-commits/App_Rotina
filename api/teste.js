import { buscarClima } from "./src/modules/clima/services/openMeteo.service.js";

const dados = await buscarClima(-16.68, -49.25);
console.log(dados.hourly);