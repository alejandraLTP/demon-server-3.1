import "reflect-metadata";
import { connectDB } from "./config/db";

import { Server } from "http";
import app from "./app";
import { PORT } from "./config/config";
import { startPeriodicCleanUp } from "./utils/emptyDirectoryCleaner";

const startServer = async (): Promise<Server> => {
  try {
    console.log("\n\n🚀 Iniciando servidor...");
    const server = app.listen(PORT, async () => {
      await connectDB();

      console.log(`\t- 🚀 Server ready at: http://localhost:${PORT}`);
      startPeriodicCleanUp();
    });

    return server;
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);

    process.exit(1);
  }
};

startServer();

export { app, startServer };
