import { z } from 'zod';

// General Purpose Schemas
export const zString = z.string().trim();
export const zName = zString
  .min(1, 'Name is required')
  .max(100, 'Name must be 100 characters or less');
export const zDescription = zString.max(500, 'Description must be 500 characters or less');
export const zNullableDescription = zDescription.nullable();

// ID / Foreign Key Schemas
export const zId = z.coerce
  .number()
  .int('ID must be an integer')
  .positive('ID must be a positive number');
export const zFk = zId;
export const zNullableFk = zFk.nullable();

// Database Specific Schemas
export const zBit = z.boolean().or(z.number().min(0).max(1));
export const zDateString = z.string().datetime({ message: 'Invalid datetime string' });
