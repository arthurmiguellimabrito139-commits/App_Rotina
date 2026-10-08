import { useEffect, useState } from "react";

function periodoAtual() {
  const horaAtual = new Date().getHours();
  if (horaAtual < 6) return "Madrugada";
  if (horaAtual < 12) return "Manhã";
  if (horaAtual < 18) return "Tarde";
  return "Noite";
}

export function useClima() {
  const [periodos, setPeriodos] = useState([]);
  const [agora, setAgora] = useState(null);
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
          setPeriodos(dados.periodos);
          setAgora(dados.agora);
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

  const atual = periodos.find((item) => item.periodo === periodoAtual());

  return { periodos, atual, agora, carregando, erro };
}