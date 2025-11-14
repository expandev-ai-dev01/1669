import {
  GetCurrentWeatherParams,
  CurrentWeatherResponse,
  ExternalWeatherAPIResponse,
} from './weatherTypes';
import { logger } from '@/utils/logger';

// In-memory cache with a Time-To-Live (TTL)
const cache = new Map<string, { data: CurrentWeatherResponse; timestamp: number }>();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

/**
 * @summary Mocks a call to an external weather API.
 * @param params - The location and unit parameters.
 * @returns A promise that resolves with mock weather data.
 */
async function fetchFromExternalAPI(
  params: GetCurrentWeatherParams
): Promise<ExternalWeatherAPIResponse> {
  logger.info('Fetching fresh data from external API mock', params);
  // This is a mock. In a real application, you would use axios or fetch
  // to call a real weather service like OpenWeatherMap.
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate network delay

  const isCelsius = params.units === 'metric' || !params.units;
  const temp = isCelsius ? 25.5 : 77.9;
  const city = params.city || 'São Paulo';

  return {
    coord: { lon: -46.63, lat: -23.55 },
    weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    base: 'stations',
    main: {
      temp: temp,
      feels_like: temp,
      temp_min: temp - 5,
      temp_max: temp + 5,
      pressure: 1012,
      humidity: 80,
    },
    visibility: 10000,
    wind: { speed: 1.5, deg: 350 },
    clouds: { all: 1 },
    dt: Date.now() / 1000,
    sys: {
      type: 1,
      id: 8394,
      country: 'BR',
      sunrise: 1603182360,
      sunset: 1603227360,
    },
    timezone: -10800,
    id: 3448439,
    name: city,
    cod: 200,
  };
}

/**
 * @summary Transforms the raw external API data into the desired response format.
 * @param apiData - The data from the external API.
 * @param units - The desired unit system.
 * @returns The formatted weather response.
 */
function transformWeatherData(
  apiData: ExternalWeatherAPIResponse,
  units: 'metric' | 'imperial' = 'metric'
): CurrentWeatherResponse {
  const formattedTimestamp = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return {
    temperatura_atual: parseFloat(apiData.main.temp.toFixed(1)),
    unidade_temperatura: units === 'metric' ? '°C' : '°F',
    localidade: `${apiData.name}, ${apiData.sys.country}`,
    timestamp_atualizacao: `Atualizado às ${formattedTimestamp}`,
    status_conexao: 'online',
  };
}

/**
 * @summary Gets the current weather for a given location, using a cache.
 * @param params - The location and unit parameters.
 * @returns A promise that resolves with the current weather data.
 */
export async function getCurrentWeather(
  params: GetCurrentWeatherParams
): Promise<CurrentWeatherResponse> {
  const cacheKey = JSON.stringify(params);
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
    logger.info('Returning cached weather data', { key: cacheKey });
    return cachedEntry.data;
  }

  const apiData = await fetchFromExternalAPI(params);
  const transformedData = transformWeatherData(apiData, params.units);

  cache.set(cacheKey, { data: transformedData, timestamp: Date.now() });
  logger.info('Cached new weather data', { key: cacheKey });

  return transformedData;
}
