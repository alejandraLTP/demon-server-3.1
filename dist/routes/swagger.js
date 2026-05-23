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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const fs_1 = __importDefault(require("fs"));
const node_path_1 = require("node:path");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const logger_1 = require("../config/logger");
function default_1(router) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log("\t- Loading swagger document", __dirname);
        try {
            const swaggerDoc = yield loadSwaggerDocument((0, node_path_1.join)(__dirname, "../../docs/swagger.yml"));
            const files = fs_1.default.readdirSync((0, node_path_1.join)(__dirname, "../../docs/routes"));
            for (const file of files) {
                const doc = yield loadSwaggerDocument((0, node_path_1.join)(__dirname, `../../docs/routes/${file}`));
                mergeSwaggerDocuments(swaggerDoc, doc);
            }
            setupSwaggerUI(router, swaggerDoc);
            // console.log("\t- Swagger routes:");
            // for (const path of Object.keys(swaggerDoc.paths)) {
            //   console.log(`\t\t- ${path}`);
            // }
        }
        catch (err) {
            handleError(err);
        }
    });
}
/**
 * Carga un documento Swagger desde un archivo YAML.
 * @param filePath Ruta del archivo YAML.
 * @returns Un documento Swagger.
 */
function loadSwaggerDocument(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yamljs_1.default.load(filePath);
    });
}
/**
 * Fusiona dos documentos Swagger.
 * @param target Documento Swagger objetivo.
 * @param source Documento Swagger fuente.
 */
function mergeSwaggerDocuments(target, source) {
    if (source.paths) {
        target.paths = Object.assign(Object.assign({}, target.paths), source.paths);
    }
    if (source.components) {
        if (source.components.schemas) {
            target.components.schemas = Object.assign(Object.assign({}, target.components.schemas), source.components.schemas);
        }
        if (source.components.responses) {
            target.components.responses = Object.assign(Object.assign({}, target.components.responses), source.components.responses);
        }
    }
}
/**
 * Configura Swagger UI en el router.
 * @param router El router de Express.
 * @param swaggerDoc El documento Swagger.
 */
function setupSwaggerUI(router, swaggerDoc) {
    router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
}
/**
 * Maneja los errores de carga y fusión de documentos Swagger.
 * @param err El error a manejar.
 */
function handleError(err) {
    if (err instanceof Error) {
        (0, logger_1.error)({
            phase: "error",
            payload: {
                message: err.message,
                stack: err.stack,
                name: err.name,
            },
        });
    }
    else {
        (0, logger_1.error)({
            phase: "error",
            payload: {
                message: "ERROR CARGANDO DOCUMENTOS SWAGGER.YML",
                stack: "",
                name: "",
            },
        });
    }
    console.error("\t- ❌ ERROR CARGANDO DOCUMENTOS SWAGGER.YML:", err);
}
//# sourceMappingURL=swagger.js.map