import styled from "styled-components";

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 320px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(49, 80, 111, 0.08);
  padding: 12px 16px;
`;

const Nome = styled.p`
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #17253a;
  margin: 0;
`;

const Tags = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

const Tag = styled.span`
  background: #eef3f8;
  border-radius: 999px;
  padding: 3px 8px;
  font-size: 11px;
  color: #4f6178;
`;

const BotaoRemover = styled.button`
  border: none;
  background: none;
  color: #d85a30;
  font-size: 12px;
  cursor: pointer;
`;

const Vazio = styled.p`
  font-size: 13px;
  color: #758499;
  font-style: italic;
`;

export default function ListaPecas({ pecas, aoRemover }) {
  if (pecas.length === 0) {
    return <Vazio>Nenhuma peça cadastrada ainda.</Vazio>;
  }

  return (
    <Lista>
      {pecas.map((peca) => (
        <Item key={peca.id}>
          <div>
            <Nome>{peca.nome}</Nome>
            <Tags>
              <Tag>{peca.tipo}</Tag>
              {peca.quente && <Tag>Quente</Tag>}
              {peca.impermeavel && <Tag>Impermeável</Tag>}
              {peca.protegeVento && <Tag>Vento</Tag>}
              {!peca.limpo && <Tag>Suja</Tag>}
            </Tags>
          </div>

          <BotaoRemover onClick={() => aoRemover(peca.id)}>Remover</BotaoRemover>
        </Item>
      ))}
    </Lista>
  );
}