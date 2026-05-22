import { DataSource, QueryRunner } from "typeorm";
import { error } from "../config/logger";

export const runInTransaction = async <T>(
  dataSource: DataSource,
  operation: (queryRunner: QueryRunner) => Promise<T>
): Promise<T> => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const result = await operation(queryRunner);
    await queryRunner.commitTransaction();
    console.info("Commite: ", result);
    return result;
  } catch (err: any) {
    console.error(err);
    await queryRunner.rollbackTransaction();
    error({
      phase: "Upload",
      component: "transaction",
      payload: {
        message: `Error en la transacción: ${err.message}`,
      },
    });
    throw new Error(`${err.message}`);
  } finally {
    await queryRunner.release();
  }
};
