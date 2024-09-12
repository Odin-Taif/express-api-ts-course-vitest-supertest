import {
  pgTable,
  serial,
  varchar,
  uniqueIndex,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    verifiedEmail: boolean("verifiedEmail").default(false).notNull(),
    verificationToken: text("verificationToken"),
    verificationTokenExpiresAt: timestamp(
      "verificationTokenExpiresAt"
    ).notNull(),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  }
);
