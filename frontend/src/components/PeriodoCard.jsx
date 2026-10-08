import styled from "styled-components";

const Cartao = styled.div`
  background: #1c1536;
  border-radius: 16px;
  padding: 12px;
  color: white;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 72px;
`;

const Nome = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin: 0;
`;

const Icone = styled.span`
  font-size: 24px;
`;

const Temperaturas = styled.p`
  font-size: 13px;
  margin: 0;
  display: flex;
  gap: 6px;
`;

const Max = styled.span`
  font-weight: 700;
`;

const Min = styled.span`
  opacity: 0.6;
`;

const ICONES = {
  Madrugada: "🌙",
  Manhã: "🌅",
  Tarde: "⛅",
  Noite: "🌧️",
};

function formatar(valor) {
  return Number.isFinite(valor) ? `${Math.round(valor)}°` : "—";
}

export default function PeriodoCard({ periodo, temperaturaMin, temperaturaMax }) {
  return (
    <Cartao>
      <Nome>{periodo}</Nome>
      <Icone>{ICONES[periodo]}</Icone>
      <Temperaturas>
        <Max>{formatar(temperaturaMax)}</Max>
        <Min>{formatar(temperaturaMin)}</Min>
      </Temperaturas>
    </Cartao>
  );
}