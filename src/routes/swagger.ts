import express from "express";
import fs from "fs";
import { join } from "node:path";
import swaggerUI from "swagger-ui-express";
import yaml from "yamljs";
import { error } from "../config/logger";

type SwaggerDocument = {
  paths: object;
  components: {
    schemas: object;
    responses: object;
    securitySchemes?: object;
  };
};

export default async function (router: express.Router) {
  //console.log("\t- Loading swagger document", __dirname);

  try {
    const swaggerDoc = await loadSwaggerDocument(
      join(__dirname, "../../docs/swagger.yml")
    );

    const files = fs.readdirSync(join(__dirname, "../../docs/routes"));

    for (const file of files) {
      const doc = await loadSwaggerDocument(
        join(__dirname, `../../docs/routes/${file}`)
      );
      mergeSwaggerDocuments(swaggerDoc, doc);
    }

    setupSwaggerUI(router, swaggerDoc);

    // console.log("\t- Swagger routes:");
    // for (const path of Object.keys(swaggerDoc.paths)) {
    //   console.log(`\t\t- ${path}`);
    // }
  } catch (err: unknown) {
    handleError(err);
  }
}

/**
 * Carga un documento Swagger desde un archivo YAML.
 * @param filePath Ruta del archivo YAML.
 * @returns Un documento Swagger.
 */

async function loadSwaggerDocument(filePath: string): Promise<SwaggerDocument> {
  return yaml.load(filePath);
}

/**
 * Fusiona dos documentos Swagger.
 * @param target Documento Swagger objetivo.
 * @param source Documento Swagger fuente.
 */

function mergeSwaggerDocuments(
  target: SwaggerDocument,
  source: SwaggerDocument
): void {
  if (source.paths) {
    target.paths = { ...target.paths, ...source.paths };
  }

  if (source.components) {
    if (source.components.schemas) {
      target.components.schemas = {
        ...target.components.schemas,
        ...source.components.schemas,
      };
    }

    if (source.components.responses) {
      target.components.responses = {
        ...target.components.responses,
        ...source.components.responses,
      };
    }
  }
}

/**
 * Configura Swagger UI en el router.
 * @param router El router de Express.
 * @param swaggerDoc El documento Swagger.
 */

function setupSwaggerUI(
  router: express.Router,
  swaggerDoc: SwaggerDocument
): void {
  router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
}

/**
 * Maneja los errores de carga y fusión de documentos Swagger.
 * @param err El error a manejar.
 */

function handleError(err: unknown): void {
  if (err instanceof Error) {
    error({
      phase: "error",
      payload: {
        message: err.message,
        stack: err.stack,
        name: err.name,
      },
    });
  } else {
    error({
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
