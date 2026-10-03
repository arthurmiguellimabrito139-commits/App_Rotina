import { useCallback, useEffect, useState } from "react";

const BASE_URL = "http://localhost:3001/api/guarda-roupa/pecas";

export function usePecas() {
  const [pecas, setPecas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const buscarPecas = useCallback(async () => {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch(BASE_URL);

      if (!resposta.ok) {
        throw new Error("Falha ao buscar as peças.");
      }

      const dados = await resposta.json();
      setPecas(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarPecas();
  }, [buscarPecas]);

  async function cadastrarPeca(novaPeca) {
    setEnviando(true);
    setErro(null);

    try {
      const resposta = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPeca),
      });

      if (!resposta.ok) {
        throw new Error("Falha ao cadastrar a peça.");
      }

      await buscarPecas();
      return true;
    } catch (e) {
      setErro(e.message);
      return false;
    } finally {
      setEnviando(false);
    }
  }

  async function removerPeca(id) {
    try {
      const resposta = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

      if (!resposta.ok) {
        throw new Error("Falha ao remover a peça.");
      }

      await buscarPecas();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function atualizarPeca(id, dados) {
    try {
      const resposta = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        throw new Error("Falha ao atualizar a peça.");
      }

      await buscarPecas();
    } catch (e) {
      setErro(e.message);
    }
  }

  return { pecas, carregando, erro, enviando, cadastrarPeca, removerPeca, atualizarPeca };
}