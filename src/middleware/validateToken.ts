import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";
import { error } from "../config/logger";
import { JwtPayload } from "../types";
import {
  MissingAuthorizationHeaderError,
  TokenError,
} from "./errors/baseHttpError";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.replace("Bearer ", "");

  if (!token) {
    error({
      phase: "validateToken",
      component: "validateToken",
      payload: {
        message: "No se ha proporcionado token",
      },
    });
    return next(new MissingAuthorizationHeaderError());
  }

  try {
    const payload = verifyToken(token) as JwtPayload;

    if (!payload) {
      error({
        phase: "validateToken",
        payload: {
          message: "Token inválido",
        },
      });
      return next(new TokenError("Token inválido"));
    }

    req.endUser = payload;
    error({
      phase: "validateToken_ok",
      component: "validateToken",
      payload: {
        message: "Token válido para upload/request protegida",
        userId: payload?.userId,
        username: payload?.username,
        tokenIat: payload?.iat,
        tokenExp: payload?.exp,
        correlationKey: [
          req.headers["x-forwarded-for"] ?? req.socket?.remoteAddress ?? req.ip ?? "unknown-ip",
          req.headers["user-agent"] ?? "unknown-agent",
          payload?.username ?? "unknown-user",
        ].join("|"),
      },
    });
    next();
  } catch (err) {
    error({
      phase: "validateToken",
      payload: {
        message: "Token inválido",
      },
    });
    return next(new TokenError("Token inválido"));
  }
}
