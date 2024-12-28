
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url: 'postgresql://tech:G9ZonIAEx5Jr@ep-rough-block-a5ms1nqe.us-east-2.aws.neon.tech/Ai-Study-Material?sslmode=require',
  }
});
