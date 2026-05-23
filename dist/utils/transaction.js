"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runInTransaction = void 0;
const logger_1 = require("../config/logger");
const runInTransaction = (dataSource, operation) => __awaiter(void 0, void 0, void 0, function* () {
    const queryRunner = dataSource.createQueryRunner();
    yield queryRunner.connect();
    yield queryRunner.startTransaction();
    try {
        const result = yield operation(queryRunner);
        yield queryRunner.commitTransaction();
        console.info("Commite: ", result);
        return result;
    }
    catch (err) {
        console.error(err);
        yield queryRunner.rollbackTransaction();
        (0, logger_1.error)({
            phase: "Upload",
            component: "transaction",
            payload: {
                message: `Error en la transacción: ${err.message}`,
            },
        });
        throw new Error(`${err.message}`);
    }
    finally {
        yield queryRunner.release();
    }
});
exports.runInTransaction = runInTransaction;
//# sourceMappingURL=transaction.js.map