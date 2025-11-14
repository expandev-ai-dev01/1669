import sql, { IRecordSet, Transaction } from 'mssql';
import { getPool } from '@/instances/database';

export enum ExpectedReturn {
  None,
  Single,
  Multi,
}

/**
 * @summary Executes a stored procedure against the database.
 * @param routine - The name of the stored procedure (e.g., '[schema].[spName]').
 * @param parameters - An object containing the parameters for the stored procedure.
 * @param expectedReturn - The expected return type from the procedure.
 * @param transaction - An optional transaction to run the procedure within.
 * @param resultSetNames - Optional array of names for multiple result sets.
 * @returns The result from the stored procedure based on expectedReturn.
 */
export async function dbRequest(
  routine: string,
  parameters: object = {},
  expectedReturn: ExpectedReturn,
  transaction?: Transaction,
  resultSetNames?: string[]
): Promise<any> {
  const pool = await getPool();
  const request = transaction ? transaction.request() : pool.request();

  for (const key in parameters) {
    if (Object.prototype.hasOwnProperty.call(parameters, key)) {
      request.input(key, (parameters as any)[key]);
    }
  }

  const result = await request.execute(routine);

  switch (expectedReturn) {
    case ExpectedReturn.None:
      return;

    case ExpectedReturn.Single:
      return result.recordset[0] || null;

    case ExpectedReturn.Multi:
      if (resultSetNames && resultSetNames.length > 0) {
        const namedResultSets: { [key: string]: IRecordSet<any> } = {};
        result.recordsets.forEach((rs, index) => {
          const name = resultSetNames[index] || `resultSet${index}`;
          namedResultSets[name] = rs;
        });
        return namedResultSets;
      }
      return result.recordsets;

    default:
      throw new Error('Invalid ExpectedReturn value');
  }
}

/**
 * @summary Begins a new database transaction.
 * @returns A promise that resolves with the transaction object.
 */
export async function beginTransaction(): Promise<Transaction> {
  const pool = await getPool();
  return pool.transaction();
}

/**
 * @summary Commits a database transaction.
 * @param transaction - The transaction to commit.
 */
export async function commitTransaction(transaction: Transaction): Promise<void> {
  await transaction.commit();
}

/**
 * @summary Rolls back a database transaction.
 * @param transaction - The transaction to roll back.
 */
export async function rollbackTransaction(transaction: Transaction): Promise<void> {
  await transaction.rollback();
}
