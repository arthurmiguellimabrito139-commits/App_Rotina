import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useClima } from "./hooks/useClima";
import PeriodoCard from "./components/PeriodoCard.jsx";
import GuardaRoupa from "./components/GuardaRoupa";
import { useAuth } from "./hooks/useAuth";
import FormularioLogin from "./components/FormularioLogin";
import FormularioCadastro from "./components/FormularioCadastro";
const EstiloGlobal = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Pagina = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  font-family: "Inter", sans-serif;
`;

const Botao = styled.button`
  margin-top: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  border: none;
  background: #17253a;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;


const TelaLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Cabecalho = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
  const { usuario , login , logout, registrar  } = useAuth();
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  
 if (!usuario) {
  return (
    <TelaLogin>
      <EstiloGlobal />
      {mostrarCadastro ? (
        <div>
          <FormularioCadastro aoRegistrar={registrar} aoLogar={login} />
          <p>
            Já tem conta?{" "}
            <Botao onClick={() => setMostrarCadastro(false)}>Faça login</Botao>
          </p>
        </div>
      ) : (
        <div>
          <FormularioLogin aoLogar={login} />
          <p>
            Não tem conta?{" "}
            <Botao onClick={() => setMostrarCadastro(true)}>Cadastre-se</Botao>
          </p>
        </div>
      )}
    </TelaLogin>
  );
}

  return (
    <Pagina>
      <EstiloGlobal />
      <Cabecalho>
        <h1>O que vestir hoje, {usuario.nome}?</h1>
        <Aba onClick={logout}>Sair</Aba>
      </Cabecalho>

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