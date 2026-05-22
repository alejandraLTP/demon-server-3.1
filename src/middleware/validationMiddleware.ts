import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "./errors/baseHttpError";

const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(({ msg }) => ({ msg }));

  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }

  next();
};

export default validationMiddleware;
