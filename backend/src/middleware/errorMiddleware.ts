import { Request, Response, NextFunction } from 'express';
import { errorResponse } from './responseHandler';
import { config } from '@/config';

/**
 * @summary Centralized error handling middleware.
 * @param err - The error object.
 * @param _req - Express request object.
 * @param res - Express response object.
 * @param _next - Express next function.
 */
export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err.stack);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  const response = errorResponse(
    'ServerError',
    message,
    config.env !== 'production' ? { stack: err.stack } : undefined
  );

  res.status(statusCode).json(response);
}
