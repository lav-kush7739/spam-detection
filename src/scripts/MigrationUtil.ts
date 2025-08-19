import DBConfig from "../config/DBConfig.js";
import Database from "../repos/Database.js";
import MigrationRepository from "../repos/MigrationRepository.js";
import MigrationScript from "./MigrationScript.js";

export default class MigrationUtil {
  private static userData: string = "";

  async run() {
    await this.executeMigration();
  }

  private extractConfig() {
    MigrationUtil.userData = JSON.stringify(process.env.DB_CONF);
    if (!MigrationUtil.userData) {
      throw new Error("Configurations not added! ");
    }
  }

  private async executeMigration() {
    const DB_HOST = process.env.DB_HOST ?? "";
    const DB_NAME = process.env.DB_NAME ?? "";
    const DB_USER = process.env.DB_USER ?? "";
    try {
      console.log("Migration Started...");
      const dbConfig = new DBConfig(DB_HOST, DB_NAME, DB_USER);
      const database = new Database(dbConfig);
      await database.createConnection();
      await this.executeMigrationScript();
    } catch (error) {
      console.error("Migration error:", error);
      throw error; // rethrow to be handled by the caller
    }
  }

  async executeMigrationScript() {
    const migrationRepo = new MigrationRepository();
    const migrationScript = new MigrationScript();
    try {
      await migrationRepo.createIfNotExists();
      const executedScript = (await migrationRepo.fetchExecuted([])).map(
        (row: any) => row.file_name
      );

      for (let script of migrationScript.SCRIPTS.keys()) {
        if (!executedScript.includes(String(script))) {
          await migrationRepo.execute(
            String(migrationScript.SCRIPTS.get(script)),
            []
          );
          await migrationRepo.recordExecution(String(script));
        }
      }
      console.log('Migration was successfull !');
      
    } catch (error) {
        console.error(error);
        throw error;
    }
  }
}
