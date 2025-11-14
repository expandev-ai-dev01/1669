/**
 * A simple logger utility.
 * In a real application, this would be replaced with a more robust logger like Winston or Pino.
 */

const log = (level: string, message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  console.log(JSON.stringify({ timestamp, level, message, meta }));
};

export const logger = {
  info: (message: string, meta?: any) => log('info', message, meta),
  warn: (message: string, meta?: any) => log('warn', message, meta),
  error: (message: string, meta?: any) => log('error', message, meta),
  debug: (message: string, meta?: any) => log('debug', message, meta),
};
