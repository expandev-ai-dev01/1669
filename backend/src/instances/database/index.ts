import sql from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger';

let pool: sql.ConnectionPool;

const dbConfig: sql.config = {
  server: config.database.server,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  options: {
    ...config.database.options,
  },
  pool: {
    ...config.database.pool,
  },
};

/**
 * @summary Creates and returns a singleton instance of the SQL Server connection pool.
 * @returns A promise that resolves with the connection pool.
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (pool) {
    return pool;
  }
  try {
    pool = await new sql.ConnectionPool(dbConfig).connect();
    logger.info('Database connection pool established.');

    pool.on('error', (err) => {
      logger.error('Database pool error', { error: err.message });
      // Optionally, you might want to try and re-establish the pool here
    });

    return pool;
  } catch (err: any) {
    logger.error('Failed to create database connection pool', { error: err.message });
    process.exit(1);
  }
}
