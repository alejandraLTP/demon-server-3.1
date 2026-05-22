import { AppDataSource } from "../config/ORMConfig";

import { afterAll, beforeAll } from "@jest/globals";
import { Server } from "http";
import { startServer } from "../server";

let server: Server;

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  server = await startServer();
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
  server.close();
});
export { server };
