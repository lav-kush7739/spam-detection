import { log } from "console";
import DBConfig from "../config/DBConfig.js";
import { Pool, PoolClient, PoolConfig } from "pg";

export default class Database {
  private static pool: Pool;
  private connection: PoolConfig;
  private static readonly CHECK_DB_EXISTS: string = `SELECT 1 FROM pg_database WHERE datname=$1`;

  constructor(config: DBConfig) {
    this.connection = config;
    const pool = new Pool(config);
    pool.on("error", (error) => {
      console.error("Error in connection pool ", error.message);
    });

    Database.pool = pool;
  }

  async getConnection(): Promise<PoolClient> {
    try {
      const client = await Database.pool.connect();
      client.on("error", (error) => {
        console.error("Error in client connection ", error.message);
      });
      return client;
    } catch (error) {
      throw error;
    }
  }

  public async beginTransaction(): Promise<PoolClient> {
    const client = await this.getConnection();
    await client.query("BEGIN");
    return client;
  }

  public async commitTransaction(client: PoolClient): Promise<void> {
    await client.query("COMMIT");
    client.release();
  }

  public async rollbackTransaction(client: PoolClient): Promise<void> {
    await client.query("ROLLBACK");
    client.release();
  }

  public async createConnection() {
    const targetDatabase = this.connection.database as string;
    this.connection.database = "postgres";
    const tempPool = new Pool(this.connection);
    const client: PoolClient = await tempPool.connect();
    try {
      await this.createDBIfNotExists(client, targetDatabase);
    } catch (error) {
      console.error(error);
    } finally {
      client.release();
      tempPool.end();
    }
    this.createActualPool(this.connection, targetDatabase);
  }

  private async createDBIfNotExists(client: PoolClient, database: string) {
    if (!/^\w+$/.test(database)) {
      throw new Error("Invalid Database Name!");
    }

    const result = await client.query(Database.CHECK_DB_EXISTS, [database]);
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${database}`);
      console.log("Database Created sucessfully");
    } else {
      console.log("Database Already Exists !");
    }
  }

  createActualPool(connection: PoolConfig, database: string) {
    connection.database = database;
    Database.pool = new Pool(connection);
  }

  public static async executeQuery(query: string, params?: any[]): Promise<any> {
    const client = await Database.pool.connect();
    try {
      const result = await client.query(query, params);
      return result;
    } catch (error) {
      console.error("Query execution error:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
