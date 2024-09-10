import { defineConfig } from "drizzle-kit";
// drizzle.config.ts
import dotenv from "dotenv";

dotenv.config();
export default defineConfig({
  schema: "./src/dbschema/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
