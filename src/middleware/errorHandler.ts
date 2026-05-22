/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { error } from "../config/logger";
import { BaseHttpError } from "./errors/baseHttpError";

const handleHttpError = (err: BaseHttpError, res: Response) => {
  error({
    phase: "error",
    component: "errorHandler",
    payload: {
      message: err.toJSON(),
      stack: err.stack,
      code: err.getCode(),
      name: err.name,
    },
  });

  res.status(err.getCode()).send(err.toJSON());
};

const handleGenericError = (err: Error, res: Response) => {
  error({
    phase: "error",
    component: "errorHandler",
    payload: {
      message: err.message,
      stack: err.stack,
      name: err.name,
    },
  });

  res.status(500).send({
    message: "ERROR DE SERVIDOR",
    details: err.message,
  });
};

export const errorHandler = (
  err: BaseHttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof BaseHttpError) {
    handleHttpError(err, res);
  } else {
    handleGenericError(err, res);
  }
};
