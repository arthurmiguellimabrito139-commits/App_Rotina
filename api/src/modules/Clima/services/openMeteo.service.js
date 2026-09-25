
export async function buscarClima (lat, lon) {
   
   const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current_weather: true,
      hourly: "temperature_2m,apparent_temperature,precipitation_probability,wind_speed_10m,uv_index",
      timezone: 'auto',
      forecast_hours: 24,
   }); 

   const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  
   const response = await fetch(url);

   return await response.json();
}