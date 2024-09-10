// import { Pool } from "pg";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { migrate } from "drizzle-orm/node-postgres/migrator";
// import "dotenv/config";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const db = drizzle(pool);

// async function main() {
//   console.log("migration started...");
//   await migrate(db, { migrationsFolder: "drizzle" });
//   console.log("migratoin ended....");
//   process.exit();
// }

// main().catch((err) => {
//   console.log(err);
//   process.exit();
// });

// src/db.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
