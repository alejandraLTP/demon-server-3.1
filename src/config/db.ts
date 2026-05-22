import { AppDataSource } from "./ORMConfig";

export const connectDB = async (): Promise<void> => {
  try {
    // if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    // }
    console.log("\t- 📚 PostgreSQL conectado con éxito");
  } catch (error) {
    console.error("\t - ❌ Error al conectar a PostgreSQL:", error);
    process.exit(1);
  }
};
