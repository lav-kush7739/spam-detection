import { PoolConfig } from "pg";

export default class DBConfig implements PoolConfig {
  host: string;
  database: string;
  user: string;
  password: string;
  port: number;
  connectionTimeout: number;

  constructor(host: string, name: string, user: string) {
    this.host = host;
    this.database = name;
    this.user = user;
    this.password = process.env.DB_PASS ?? "";
    this.port = parseInt(process.env.DB_PORT ?? "5432");
    this.connectionTimeout = 10000;
  }
}
