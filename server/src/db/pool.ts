// server/src/db/pool.ts
import fs from 'fs';
import path from 'path';
import { Pool, PoolClient, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Path to the RDS CA certificate
const caCertPath = path.resolve(__dirname, '../../rds-ca.pem');
if (!fs.existsSync(caCertPath)) {
  throw new Error(`RDS CA certificate not found at ${caCertPath}`);
}

const caCert = fs.readFileSync(caCertPath, 'utf-8');

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true, // verifies the RDS server certificate
    ca: caCert,
  },
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

// Global pool error handler
pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  process.exit(1);
});

/**
 * Typed query helper — returns rows directly as T[].
 * Use this for standalone queries outside transactions.
 */
export async function query<
  T extends QueryResultRow = Record<string, unknown>
>(text: string, params?: unknown[]): Promise<T[]> {
  const res = await pool.query<T>(text, params);
  return res.rows;
}

/**
 * Run multiple queries inside a single transaction.
 * Inside the callback, use client.query(...).rows to access results.
 */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const result = await fn(client);

    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}