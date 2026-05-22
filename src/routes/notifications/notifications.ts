import * as notificationController from "../../controllers/notifications/notificationController";
import Router from "../router";

export default (router: Router) => {
  router.get("/sse", notificationController.connectSSE);
};
