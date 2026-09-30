import { useClima } from "./hooks/useClima";
import PeriodoCard from "./components/PeriodoCard.jsx";

function App() {
  const { periodos, carregando, erro } = useClima();

  if (carregando) return <p>Carregando previsão...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div style={{ padding: "32px" }}>
      <h1>O que vestir hoje?</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {periodos.map((p) => (
          <PeriodoCard key={p.periodo} {...p} />
        ))}
      </div>
    </div>
  );
}

export default App;