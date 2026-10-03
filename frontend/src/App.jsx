import { useState } from "react";
import styled from "styled-components";
import { useClima } from "./hooks/useClima";
import PeriodoCard from "./components/PeriodoCard.jsx";
import GuardaRoupa from "./components/GuardaRoupa";

const Pagina = styled.div`
  padding: 32px;
  font-family: "Inter", sans-serif;
`;

const Abas = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const Aba = styled.button`
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  background: ${(props) => (props.$ativa ? "#17253a" : "#eef3f8")};
  color: ${(props) => (props.$ativa ? "white" : "#17253a")};
`;

function TelaClima() {
  const { periodos, carregando, erro } = useClima();

  if (carregando) return <p>Carregando previsão...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {periodos.map((p) => (
        <PeriodoCard key={p.periodo} {...p} />
      ))}
    </div>
  );
}

function App() {
  const [aba, setAba] = useState("clima");

  return (
    <Pagina>
      <h1>O que vestir hoje?</h1>

      <Abas>
        <Aba $ativa={aba === "clima"} onClick={() => setAba("clima")}>
          Clima
        </Aba>
        <Aba $ativa={aba === "guardaRoupa"} onClick={() => setAba("guardaRoupa")}>
          Guarda-roupa
        </Aba>
      </Abas>

      {aba === "clima" ? <TelaClima /> : <GuardaRoupa />}
    </Pagina>
  );
}

export default App;