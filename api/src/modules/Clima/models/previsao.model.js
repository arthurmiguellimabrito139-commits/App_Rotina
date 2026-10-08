export class Previsao {
  constructor(temperatura, hora, sensacao, chuva, vento, uv, umidade) {
    this.temperatura = temperatura;
    this.hora = hora;
    this.sensacao = sensacao;
    this.chuva = chuva;
    this.vento = vento;
    this.uv = uv;
    this.umidade = umidade;
  }

  static montarLista(dadosBrutos) {
    const h = dadosBrutos.hourly;
   
     h.time.forEach((hora, i) => {
    console.log(hora, "| ar:", h.temperature_2m[i], "| sensação:", h.apparent_temperature[i]);
  });
    const lista = h.time.map((hora, index) => {
      return new Previsao(
        h.temperature_2m[index],
        hora,
        h.apparent_temperature[index],
        h.precipitation_probability[index],
        h.wind_speed_10m[index],
        h.uv_index[index],
        h.relative_humidity_2m[index]
      );
    });
          
  
    return lista;
  }
}
