export interface GetCurrentWeatherParams {
  lat?: number;
  lon?: number;
  city?: string;
  units?: 'metric' | 'imperial';
}

export interface CurrentWeatherResponse {
  temperatura_atual: number;
  unidade_temperatura: '°C' | '°F';
  localidade: string;
  timestamp_atualizacao: string;
  status_conexao: 'online'; // Backend always returns 'online' on success
}

// Mock structure for an external API response
export interface ExternalWeatherAPIResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
