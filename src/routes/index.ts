import express from "express";

import { NODE_ENV } from "../config/config";
import auth from "./authRoutes";
import demonRoutes from "./demonRoutes";
import fileRoutes from "./fileRoutes";
import notifications from "./notifications/notifications";
import Router from "./router";
import swagger from "./swagger";

export default () => {
  const router = new Router(express.Router());
  auth(router);
  fileRoutes(router);
  demonRoutes(router);

  notifications(router);

  if (NODE_ENV === "development" || NODE_ENV === "staging")
    swagger(router.router);

  return router.router;
};
