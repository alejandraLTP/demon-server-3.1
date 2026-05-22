import { config } from "dotenv";
import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  NODE_ENV,
} from "./config";
import { join } from "path";

if (NODE_ENV === "test") {
  config({ path: ".env.test" });
} else {
  config();
}
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false, // Cambiar a `false` en producción
  logging: [],
  entities: [join(__dirname, "../Entities/**/*{.ts,.js}")],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});
