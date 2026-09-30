export class Previsao {
  constructor(hora, sensacao, chuva, vento, uv) {
    this.hora = hora;
    this.sensacao = sensacao;
    this.chuva = chuva;
    this.vento = vento;
    this.uv = uv;
  }

  static montarLista(dadosBrutos) {
    const h = dadosBrutos.hourly;

    const lista = h.time.map((hora, index) => {
      return new Previsao(
        hora,
        h.apparent_temperature[index],
        h.precipitation_probability[index],
        h.wind_speed_10m[index],
        h.uv_index[index]
      );
    });

    return lista;
  }
}
