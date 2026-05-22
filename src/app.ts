import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";

import { info } from "./config/logger";

import { errorHandler } from "./middleware/errorHandler";
import { ResourceNotFoundError } from "./middleware/errors/baseHttpError";
import routes from "./routes/index";
import { startPeriodicCleanUp } from "./utils/emptyDirectoryCleaner";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes());

app.get("/", (req, res) => {
  res.send("☑️ testing ☑️");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  info({
    phase: "request",
    payload: {
      method: req.method,
      url: req.originalUrl,
      component: "app",
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    },
  });

  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ResourceNotFoundError());
});

app.use(errorHandler);

export default app;
