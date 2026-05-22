import { RequestHandler } from "express";
import { error, info } from "../config/logger";
import { userLogin } from "../services/authService";

export const login: RequestHandler = async (req, res, next) => {
  const incomingBody = req.body ?? {};
  let normalizedBody = incomingBody;

  if (
    typeof incomingBody === "object" &&
    !Array.isArray(incomingBody) &&
    !incomingBody.username &&
    !incomingBody.password &&
    Object.keys(incomingBody).length === 1
  ) {
    const [rawKey] = Object.keys(incomingBody);
    if (rawKey.startsWith("{") && rawKey.endsWith("}")) {
      try {
        normalizedBody = JSON.parse(rawKey);
      } catch {
        normalizedBody = incomingBody;
      }
    }
  }

  const { username, password } = normalizedBody;
  const loginCorrelationKey = [
    req.headers["x-forwarded-for"] ?? req.socket?.remoteAddress ?? req.ip ?? "unknown-ip",
    req.headers["user-agent"] ?? "unknown-agent",
    normalizedBody?.username ?? "unknown-user",
  ].join("|");
  console.log("[LOGIN_REQUEST_BODY]", req.body ?? {});
  console.log("[LOGIN_REQUEST_HEADERS]", req.headers ?? {});
  error({
    phase: "login_request",
    component: "login",
    payload: {
      message: "Request de login recibida",
      body: req.body ?? {},
      normalizedBody,
      headers: req.headers ?? {},
      loginCorrelationKey,
    },
  });
  const requestSource = {
    aduana: normalizedBody?.aduana ?? req.headers["x-aduana"],
    equipo: normalizedBody?.equipo ?? req.headers["x-equipo"],
    ip:
      req.headers["x-forwarded-for"] ??
      req.socket?.remoteAddress ??
      req.ip ??
      "unknown",
    userAgent: req.headers["user-agent"] ?? "unknown",
  };

  if (!username || !password) {
    console.log("[LOGIN_INVALID_PAYLOAD]", {
      message: "Solicitud de login sin username/password",
      source: requestSource,
      bodyKeys: Object.keys(req.body ?? {}),
      usernamePresent: Boolean(username),
      passwordPresent: Boolean(password),
    });
    error({
      phase: "login_invalid_payload",
      component: "login",
      payload: {
        message: "Solicitud de login sin username/password",
        source: requestSource,
        body: req.body ?? {},
        normalizedBody,
        headers: req.headers ?? {},
        bodyKeys: Object.keys(req.body ?? {}),
        contentType: req.headers["content-type"] ?? "unknown",
        usernamePresent: Boolean(username),
        passwordPresent: Boolean(password),
        loginCorrelationKey,
        uploadWillRequireValidToken: true,
      },
    });
  }

  try {
    const token = await userLogin(username, password);

    if (token) {
      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token: token.token,
      });
      info({
        phase: "login",
        payload: {
          message: "Inicio de sesión exitoso",
          loginCorrelationKey,
          username,
        },
      });
    } else {
      error({
        phase: "login",
        payload: {
          message: "Error de autenticación",
        },
      });
      res.status(401).json({
        status: false,
        message: "Error de autenticación",
      });

      next();
    }
  } catch (err: any) {
    error({
      phase: "login",
      component: "login",
      payload: {
        message: err.message,
        description: err.description,
        loginCorrelationKey,
        usernamePresent: Boolean(username),
        passwordPresent: Boolean(password),
        uploadWillRequireValidToken: true,
      },
    });
    next(err);
  }
};
