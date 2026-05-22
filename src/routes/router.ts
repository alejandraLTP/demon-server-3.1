import { IRouter, RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import { upload } from "../utils/multer";

type Handler = RequestHandler | ValidationChain[] | ValidationChain;
type Handlers = Handler[];

type GroupOptions = {
  middleware: Handlers | Handler;
};

export default class Router {
  private readonly _router: IRouter;
  private middlewareStack: Handlers = [];

  constructor(router: IRouter) {
    this._router = router;
  }

  private applyMiddleware(...handlers: Handlers): Handlers {
    return [...this.middlewareStack, ...handlers];
  }

  private registerMethod(
    method: keyof IRouter,
    path: string,
    ...handlers: Handlers
  ) {
    (this._router[method] as any)(path, ...this.applyMiddleware(...handlers));
  }

  get(path: string, ...handlers: Handlers) {
    this.registerMethod("get", path, ...handlers);
  }

  post(path: string, ...handlers: Handlers) {
    this.registerMethod("post", path, ...handlers);
  }

  postWithFile(path: string, ...handlers: Handlers) {
    this._router.post(
      path,

      upload.single("file"),

      ...this.applyMiddleware(...handlers)
    );
  }

  postWithFiles(path: string, ...handlers: Handlers) {
    this._router.post(
      path,
      upload.array("files"),
      ...this.applyMiddleware(...handlers)
    );
  }

  put(path: string, ...handlers: Handlers) {
    this.registerMethod("put", path, ...handlers);
  }

  delete(path: string, ...handlers: Handlers) {
    this.registerMethod("delete", path, ...handlers);
  }

  group({ middleware }: GroupOptions, callback: () => void) {
    const stack = Array.isArray(middleware) ? middleware : [middleware];
    this.middlewareStack.push(...stack);

    callback();

    this.middlewareStack.splice(-stack.length, stack.length);
  }

  get router() {
    return this._router;
  }
}
