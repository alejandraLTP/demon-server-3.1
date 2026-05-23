"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const config_1 = require("./config");
const path_1 = require("path");
if (config_1.NODE_ENV === "test") {
    (0, dotenv_1.config)({ path: ".env.test" });
}
else {
    (0, dotenv_1.config)();
}
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.DB_HOST,
    port: Number(config_1.DB_PORT),
    username: config_1.DB_USERNAME,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    synchronize: false, // Cambiar a `false` en producción
    logging: [],
    entities: [(0, path_1.join)(__dirname, "../Entities/**/*{.ts,.js}")],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
//# sourceMappingURL=ORMConfig.js.map