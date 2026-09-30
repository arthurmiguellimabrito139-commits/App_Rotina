import "./PeriodoCard.css";

const ESTILO_POR_PERIODO = {
  Madrugada: { cor: "periodo-madrugada", icone: "🌙", horario: "00h — 06h" },
  Manhã: { cor: "periodo-manha", icone: "🌅", horario: "06h — 12h" },
  Tarde: { cor: "periodo-tarde", icone: "⛅", horario: "12h — 18h" },
  Noite: { cor: "periodo-noite", icone: "🌧️", horario: "18h — 24h" },
};

export default function PeriodoCard({ periodo, sensacaoMin, sensacaoMax, roupas }) {
  const estilo = ESTILO_POR_PERIODO[periodo] ?? {};

  return (
    <div className="periodo-card">
      <div className={`periodo-cabecalho ${estilo.cor}`}>
        <div className="periodo-info">
          <span className="periodo-icone">{estilo.icone}</span>
          <div>
            <p className="periodo-nome">{periodo}</p>
            <p className="periodo-horario">{estilo.horario}</p>
          </div>
        </div>
        <p className="periodo-temperatura">
          {Math.round(sensacaoMin)}° → {Math.round(sensacaoMax)}°
        </p>
      </div>

      <div className="periodo-corpo">
        {roupas.length > 0 ? (
          <div className="periodo-pills">
            {roupas.map((item) => (
              <span key={item} className="pill">
                ✓ {item}
              </span>
            ))}
          </div>
        ) : (
          <p className="periodo-vazio">Recomendação de roupa ainda não calculada.</p>
        )}
      </div>
    </div>
  );
}