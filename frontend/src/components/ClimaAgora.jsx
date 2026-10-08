import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(135deg, #4c3fe3, #6a4fe0);
  border-radius: 24px;
  padding: 32px;
  color: white;
  width: 100%;
  max-width: 500px;
  font-family: "Inter", sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Periodo = styled.p`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin: 0;
`;

const Data = styled.p`
  font-size: 13px;
  opacity: 0.8;
  margin: 4px 0 0;
`;

const TemperaturaWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Roupas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  width: 100%;
`;

const Pill = styled.span`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
`;

const Icone = styled.span`
  font-size: 40px;
`;

const Temperatura = styled.span`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 56px;
`;

const ICONES = {
  Madrugada: "🌙",
  Manhã: "🌅",
  Tarde: "⛅",
  Noite: "🌧️",
};

function formatarData() {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function ClimaAgora({ atual, agora }) {
  if (!atual || !agora) return null;

  return (
   <Card>
  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
    <div>
      <Periodo>{atual.periodo}</Periodo>
      <Data>{formatarData()}</Data>
    </div>
    <TemperaturaWrap>
      <Icone>{ICONES[atual.periodo]}</Icone>
      <Temperatura>{Math.round(agora.temperatura)}°</Temperatura>
    </TemperaturaWrap>
  </div>

  <Roupas>
    {atual.roupas.map((item) => (
      <Pill key={item}>{item}</Pill>
    ))}
  </Roupas>
</Card>
  );
}