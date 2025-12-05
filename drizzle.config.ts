/* eslint-disable @typescript-eslint/no-unsafe-call */

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL ?? "",
  },
});
