import { useEffect, useState } from "react";

export function useClima() {
  const [periodos, setPeriodos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const url = `http://localhost:3001/api/clima?lat=${coords.latitude}&lon=${coords.longitude}`;
          const resposta = await fetch(url);

          if (!resposta.ok) {
            throw new Error("Falha ao buscar o clima");
          }

          const dados = await resposta.json();
          setPeriodos(dados);
        } catch (e) {
          setErro(e.message);
        } finally {
          setCarregando(false);
        }
      },
      () => {
        setErro("Permita o acesso à localização para ver o clima.");
        setCarregando(false);
      }
    );
  }, []);

  return { periodos, carregando, erro };
}