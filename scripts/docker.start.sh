# ./node_modules/.bin/prisma migrate deploy && node build/server.js
npx drizzle-kit generate && npx drizzle-kit migrate && node build/src/server.js
