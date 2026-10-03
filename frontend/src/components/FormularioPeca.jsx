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

const LinhaCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4f6178;
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

const PECA_VAZIA = {
  nome: "",
  tipo: "",
  quente: false,
  impermeavel: false,
  protegeVento: false,
};

export default function FormularioPeca({ aoCadastrar, enviando, erro }) {
  const [peca, setPeca] = useState(PECA_VAZIA);

  function atualizarCampo(campo, valor) {
    setPeca((atual) => ({ ...atual, [campo]: valor }));
  }

  async function aoSubmeter(evento) {
    evento.preventDefault();

    const sucesso = await aoCadastrar(peca);

    if (sucesso) {
      setPeca(PECA_VAZIA);
    }
  }

  return (
    <Form onSubmit={aoSubmeter}>
      <Titulo>Nova peça</Titulo>

      <Campo
        type="text"
        placeholder="Nome (ex.: Jaqueta jeans azul)"
        value={peca.nome}
        onChange={(e) => atualizarCampo("nome", e.target.value)}
        required
      />

      <Campo
        type="text"
        placeholder="Tipo (ex.: casaco, camiseta)"
        value={peca.tipo}
        onChange={(e) => atualizarCampo("tipo", e.target.value)}
        required
      />

      <LinhaCheckbox>
        <input
          type="checkbox"
          checked={peca.quente}
          onChange={(e) => atualizarCampo("quente", e.target.checked)}
        />
        Serve para frio
      </LinhaCheckbox>

      <LinhaCheckbox>
        <input
          type="checkbox"
          checked={peca.impermeavel}
          onChange={(e) => atualizarCampo("impermeavel", e.target.checked)}
        />
        Impermeável
      </LinhaCheckbox>

      <LinhaCheckbox>
        <input
          type="checkbox"
          checked={peca.protegeVento}
          onChange={(e) => atualizarCampo("protegeVento", e.target.checked)}
        />
        Protege do vento
      </LinhaCheckbox>

      {erro && <Mensagem>{erro}</Mensagem>}

      <Botao type="submit" disabled={enviando}>
        {enviando ? "Salvando..." : "Cadastrar peça"}
      </Botao>
    </Form>
  );
}