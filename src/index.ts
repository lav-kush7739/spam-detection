import dotenv from "dotenv";
dotenv.config();

import MigrationUtil from "./scripts/MigrationUtil.js";
import server from './server.js'

(async () => {
  try {
    const migration = new MigrationUtil();
    await migration.run();

    server.listen(process.env.PORT ?? 8000, () => {
      console.log(`Express app started at port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
})();
