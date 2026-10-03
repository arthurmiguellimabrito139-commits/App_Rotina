function lerNumero(valor) {
  if (valor === undefined || valor === null || String(valor).trim() === "") {
    return NaN;
  }
  return Number(valor);
}

// Retorna { lat, lon } válidos ou null se estiverem ausentes/fora do intervalo
export function lerCoordenadas(origem) {
  const lat = lerNumero(origem.lat);
  const lon = lerNumero(origem.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;

  return { lat, lon };
}
