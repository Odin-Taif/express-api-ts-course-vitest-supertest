// src/dbschema/user.ts
import {
  pgTable,
  serial,
  varchar,
  uniqueIndex,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }), // Nullable by default if not `.notNull()` is added
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email), // Unique constraint for the email column
    };
  }
);
