import { Request, Response } from 'express';
import { successResponse } from '@/middleware/responseHandler';

/**
 * @summary Checks the health of the API.
 * @param _req - Express request object.
 * @param res - Express response object.
 */
export async function getHandler(_req: Request, res: Response): Promise<void> {
  const healthCheck = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(successResponse(healthCheck));
}
