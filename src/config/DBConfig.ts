import { PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();
export default class DBConfig implements PoolConfig {
  connectionString: string;
  ssl?: any;

  constructor() {
    this.connectionString = process.env.DATABASE_URL ?? '';
    this.ssl = { rejectUnauthorized: false };
  }
}
