import { Request, Response, NextFunction } from 'express';

/**
 * @summary Handles requests to non-existent routes.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}
