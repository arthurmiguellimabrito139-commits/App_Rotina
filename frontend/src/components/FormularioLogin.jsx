import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 12px 32px rgba(49, 80, 111, 0.1);
  padding: 24px;
  width: 320px;
  font-family: "Inter", sans-serif;
`;

const Titulo = styled.h2`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #17253a;
  margin: 0 0 4px;
`;

const Campo = styled.input`
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid #d8e0ea;
  font-size: 14px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #17253a;
  }
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

const Mensagem = styled.p`
  font-size: 12px;
  color: #d85a30;
  margin: 0;
`;

export default function FormularioLogin({ aoLogar }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function aoSubmeter(evento) {
    evento.preventDefault();

    setErro(null);
    setEnviando(true);

    try {
      await aoLogar(email, senha);
    } catch (e) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <Form onSubmit={aoSubmeter}>
      <Titulo>Entrar</Titulo>

      <Campo
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Campo
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      {erro && <Mensagem>{erro}</Mensagem>}

      <Botao type="submit" disabled={enviando}>
        {enviando ? "Entrando..." : "Entrar"}
      </Botao>
    </Form>
  );
}