"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("../utils/multer");
class Router {
    constructor(router) {
        this.middlewareStack = [];
        this._router = router;
    }
    applyMiddleware(...handlers) {
        return [...this.middlewareStack, ...handlers];
    }
    registerMethod(method, path, ...handlers) {
        this._router[method](path, ...this.applyMiddleware(...handlers));
    }
    get(path, ...handlers) {
        this.registerMethod("get", path, ...handlers);
    }
    post(path, ...handlers) {
        this.registerMethod("post", path, ...handlers);
    }
    postWithFile(path, ...handlers) {
        this._router.post(path, multer_1.upload.single("file"), ...this.applyMiddleware(...handlers));
    }
    postWithFiles(path, ...handlers) {
        this._router.post(path, multer_1.upload.array("files"), ...this.applyMiddleware(...handlers));
    }
    put(path, ...handlers) {
        this.registerMethod("put", path, ...handlers);
    }
    delete(path, ...handlers) {
        this.registerMethod("delete", path, ...handlers);
    }
    group({ middleware }, callback) {
        const stack = Array.isArray(middleware) ? middleware : [middleware];
        this.middlewareStack.push(...stack);
        callback();
        this.middlewareStack.splice(-stack.length, stack.length);
    }
    get router() {
        return this._router;
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map