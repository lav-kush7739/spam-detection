import { PoolConfig } from "pg";
import { ConnectionOptions } from "tls";

export default class DBConfig implements PoolConfig {
  connectionString: string;
  ssl?: boolean | ConnectionOptions | undefined;

  constructor() {
    this.connectionString = process.env.DATABASE_URL ?? '';
    this.ssl = { rejectUnauthorized: false };
  }
}
