
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/__generated__/db_schema.ts",
  out: "./migrations",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "hscopycenter-db",
  },
  dialect: "sqlite",
} satisfies Config;
