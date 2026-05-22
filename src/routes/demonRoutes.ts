import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/demonController";

import validateToken from "../middleware/validateToken";
import errorHandler from "../middleware/validationMiddleware";
import Router from "./router";

export default (router: Router) => {
  router.group({ middleware: [validateToken] }, () => {
    router.post("/users", errorHandler, createUser);

    router.get("/users", errorHandler, getAllUsers);

    router.get("/users/:id", errorHandler, getUser);

    router.put("/users/:id", errorHandler, updateUser);

    router.delete("/users/:id", errorHandler, deleteUser);
  });
};
