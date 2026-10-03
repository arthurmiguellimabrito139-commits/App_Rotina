// Limites usados tanto no texto da recomendação quanto na escolha das peças do guarda-roupa
export const LIMITES = {
    frio: 18,       // sensação térmica abaixo disso pede roupa quente
    ameno: 25,
    calor: 30,
    chuva: 50,      // % de probabilidade de chuva
    vento: 30,      // km/h
    uv: 6,
};

export class Recomendacao {
    constructor(temperaturas, periodo, sensacaoMin, sensacaoMax, chuva, vento, uv, roupas) {
        this.temperaturas = temperaturas;
        const temperaturasValidas = temperaturas.filter(Number.isFinite);
        this.temperaturaMin = temperaturasValidas.length ? Math.min(...temperaturasValidas) : null;
        this.temperaturaMax = temperaturasValidas.length ? Math.max(...temperaturasValidas) : null;
        this.periodo = periodo;
        this.sensacaoMin = sensacaoMin;
        this.sensacaoMax = sensacaoMax;
        this.chuva = chuva;
        this.vento = vento;
        this.uv = uv;
        this.roupas = roupas;
    }

    static periodoDaHora(horaISO) {
        const h = Number(horaISO.slice(11, 13));

        if (h < 6) return "Madrugada";
        if (h < 12) return "Manhã";
        if (h < 18) return "Tarde";
        return "Noite";
    }
    static agruparPorPeriodo(listaPrevisao) {
        const ORDEM = ["Madrugada", "Manhã", "Tarde", "Noite"];

        const grupos = {};

        listaPrevisao.forEach((previsao) => {
            const periodo = Recomendacao.periodoDaHora(previsao.hora);
            const data = previsao.hora.slice(0, 10); // ex.: "2026-10-02"
            const chave = `${data}_${periodo}`;

            if (!grupos[chave]) {
                grupos[chave] = { periodo, lista: [] };
            }

            grupos[chave].lista.push(previsao);
        });

        const todosOsGrupos = Object.values(grupos).map(({ periodo, lista }) => {
            const sensacoes = lista.map((p) => p.sensacao);
            const chuvas = lista.map((p) => p.chuva);
            const ventos = lista.map((p) => p.vento);
            const uvs = lista.map((p) => p.uv);
            const temperaturas = lista.map((p) => p.temperatura);

            const sensacaoMin = Math.min(...sensacoes);
            const sensacaoMax = Math.max(...sensacoes);
            const piorChuva = Math.max(...chuvas);
            const piorVento = Math.max(...ventos);
            const piorUv = Math.max(...uvs);

            const roupas = Recomendacao.definirRoupas({
                sensacaoMin,
                chuva: piorChuva,
                vento: piorVento,
                uv: piorUv,
            });

            return new Recomendacao(temperaturas, periodo, sensacaoMin, sensacaoMax, piorChuva, piorVento, piorUv, roupas);
        });

        
        const periodosVistos = new Set();
        const resultado = todosOsGrupos.filter((r) => {
            if (periodosVistos.has(r.periodo)) return false;
            periodosVistos.add(r.periodo);
            return true;
        });

        resultado.sort((a, b) => ORDEM.indexOf(a.periodo) - ORDEM.indexOf(b.periodo));

        return resultado;
    }

    static definirRoupas({ sensacaoMin, chuva, vento, uv }) {
        const roupas = [];

        if (sensacaoMin < LIMITES.frio) {
            roupas.push("blusa de frio ou camisa de manga comprida");
        } else if (sensacaoMin < LIMITES.ameno) {
            roupas.push("camisa de manga curta ou camiseta");
        } else if (sensacaoMin < LIMITES.calor) {
            roupas.push("camiseta leve branca ou colorida");
        } else {
            roupas.push("regata ou camiseta leve");
        }

        if (chuva >= LIMITES.chuva) {
            roupas.push("guarda-chuva ou casaco impermeável");
        }

        if (vento >= LIMITES.vento) {
            roupas.push("capa de vento ou jaqueta leve");
        }

        if (uv >= LIMITES.uv) {
            roupas.push("protetor solar e óculos de sol");
        }

        return roupas;
    }
}