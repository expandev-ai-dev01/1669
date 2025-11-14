import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse } from '@/middleware/responseHandler';
import { getCurrentWeather } from '@/services/weather/weatherService';
import { GetCurrentWeatherParams } from '@/services/weather/weatherTypes';

const weatherQuerySchema = z
  .object({
    lat: z.coerce.number().optional(),
    lon: z.coerce.number().optional(),
    city: z.string().min(1).optional(),
    units: z.enum(['metric', 'imperial']).default('metric').optional(),
  })
  .refine((data) => (data.lat !== undefined && data.lon !== undefined) || data.city, {
    message: 'Either "city" or both "lat" and "lon" must be provided.',
    path: ['query'],
  });

/**
 * @summary Handles the request to get the current weather.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const queryParams: GetCurrentWeatherParams = await weatherQuerySchema.parseAsync(req.query);

    const weatherData = await getCurrentWeather(queryParams);

    res.status(200).json(successResponse(weatherData));
  } catch (error) {
    next(error);
  }
}
