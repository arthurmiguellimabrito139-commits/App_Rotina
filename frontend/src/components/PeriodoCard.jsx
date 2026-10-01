import styled from "styled-components";

const Card = styled.div`
  background: white;
  border-radius: 24px;
  box-shadow: 0 12px 32px rgba(49, 80, 111, 0.1);
  overflow: hidden;
  width: 280px;
  font-family: "Inter", sans-serif;
`;

const Cabecalho = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: ${(props) => props.$corFundo};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icone = styled.span`
  background: white;
  border-radius: 999px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

const Nome = styled.p`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #17253a;
  margin: 0;
`;

const Horario = styled.p`
  font-weight: 600;
  font-size: 11px;
  color: #4f6178;
  margin: 2px 0 0;
`;

const Temperatura = styled.p`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #17253a;
  margin: 0;
`;

const Corpo = styled.div`
  padding: 20px;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Pill = styled.span`
  background: #eef3f8;
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 12px;
  color: #17253a;
`;

const Vazio = styled.p`
  font-size: 12px;
  color: #758499;
  font-style: italic;
`;

const ESTILO_POR_PERIODO = {
  Madrugada: { corFundo: "#eef3f8", icone: "🌙", horario: "00h — 06h" },
  Manhã: { corFundo: "#fff4d8", icone: "🌅", horario: "06h — 12h" },
  Tarde: { corFundo: "#e1eff9", icone: "⛅", horario: "12h — 18h" },
  Noite: { corFundo: "#ede9f8", icone: "🌧️", horario: "18h — 24h" },
};

export default function PeriodoCard({ periodo, sensacaoMin, sensacaoMax, roupas }) {
  const estilo = ESTILO_POR_PERIODO[periodo] ?? {};

  return (
    <Card>
      <Cabecalho $corFundo={estilo.corFundo}>
        <Info>
          <Icone>{estilo.icone}</Icone>
          <div>
            <Nome>{periodo}</Nome>
            <Horario>{estilo.horario}</Horario>
          </div>
        </Info>
        <Temperatura>
          {Math.round(sensacaoMin)}° → {Math.round(sensacaoMax)}°
        </Temperatura>
      </Cabecalho>

      <Corpo>
        {roupas.length > 0 ? (
          <Pills>
            {roupas.map((item) => (
              <Pill key={item}>✓ {item}</Pill>
            ))}
          </Pills>
        ) : (
          <Vazio>Recomendação de roupa ainda não calculada.</Vazio>
        )}
      </Corpo>
    </Card>
  );
}