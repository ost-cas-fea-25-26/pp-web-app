import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const dbPool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL!,
});

export const dbInstance = drizzle(dbPool);
