import { uploadFile } from "../controllers/fileUploadController";
import validateToken from "../middleware/validateToken";
import errorHandler from "../middleware/validationMiddleware";
import Router from "./router";

export default (router: Router) => {
  router.postWithFile("/upload", validateToken, errorHandler, uploadFile);
};
