export async function buscarClima(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    hourly: "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,wind_speed_10m,uv_index",
    timezone: "auto",
    forecast_hours: 24,
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Falha ao consultar a Open-Meteo (status ${response.status})`);
  }

  return await response.json();
}