import * as authController from "../controllers/authController";
import errorHandler from "../middleware/validationMiddleware";

import Router from "./router";

export default (router: Router) => {
  router.post("/auth", errorHandler, authController.login);
};
