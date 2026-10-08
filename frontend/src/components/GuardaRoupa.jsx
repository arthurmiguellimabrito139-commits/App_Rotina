import styled from "styled-components";
import { usePecas } from "../hooks/usePecas";
import FormularioPeca from "./FormularioPeca";
import ListaPecas from "./ListaPecas";

const Container = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export default function GuardaRoupa({ token }) {
  const { pecas, carregando, erro, enviando, cadastrarPeca, removerPeca } = usePecas(token);

  return (
    <Container>
      <FormularioPeca aoCadastrar={cadastrarPeca} enviando={enviando} erro={erro} />

      {carregando ? <p>Carregando guarda-roupa...</p> : <ListaPecas pecas={pecas} aoRemover={removerPeca} />}
    </Container>
  );
}