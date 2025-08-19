import Database from './Database.js';

export default class MigrationRepository {
        constructor(){}

        async createIfNotExists(){
                await Database.executeQuery(`CREATE TABLE IF NOT EXISTS DB_MIGRATION(
                        id INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
                        file_name TEXT NOT NULL,
                        migrated_on TIMESTAMPTZ NOT NULL,
                        CONSTRAINT db_migration_name UNIQUE (file_name)
                        );`,[])
        }

        async execute(query:string, values:[]){
              return await  Database.executeQuery(query,values);
        }

        async fetchExecuted(values:[]){
                const result = await Database.executeQuery(`SELECT file_name from DB_MIGRATION;`,[]);
                return result.rows;
        }

        async recordExecution(name:string){
                await Database.executeQuery(`INSERT INTO DB_MIGRATION (file_name,migrated_on) VALUES($1,$2);`,[name,new Date()])
        }
}