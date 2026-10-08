import styled from "styled-components";

const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 500px;
`;

const Cartao = styled.div`
  background: #f3f0fc;
  border-radius: 16px;
  padding: 16px;
  font-family: "Inter", sans-serif;
`;

const Rotulo = styled.p`
  font-size: 12px;
  color: #6b6b85;
  margin: 0 0 6px;
`;

const Valor = styled.p`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #17253a;
  margin: 0;
`;

export default function Metricas({ agora }) {
  if (!agora) return null;

  return (
    <Grade>
      <Cartao>
        <Rotulo>Sensação</Rotulo>
        <Valor>{Math.round(agora.sensacao)}°</Valor>
      </Cartao>

      <Cartao>
        <Rotulo>Umidade</Rotulo>
        <Valor>{Math.round(agora.umidade)}%</Valor>
      </Cartao>

      <Cartao>
        <Rotulo>Vento</Rotulo>
        <Valor>{Math.round(agora.vento)} km/h</Valor>
      </Cartao>

      <Cartao>
        <Rotulo>Chance de chuva</Rotulo>
        <Valor>{Math.round(agora.chuva)}%</Valor>
      </Cartao>
    </Grade>
  );
}