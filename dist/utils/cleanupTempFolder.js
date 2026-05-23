"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupTempFolder = cleanupTempFolder;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const TEMP_DIR = path_1.default.resolve("./tempFolder");
const MAX_AGE = 1000 * 60 * 60;
let lastCleanup = 0;
function cleanupTempFolder() {
    return __awaiter(this, void 0, void 0, function* () {
        const now = Date.now();
        if (now - lastCleanup < MAX_AGE)
            return;
        lastCleanup = now;
        try {
            if (!(yield fs_extra_1.default.pathExists(TEMP_DIR)))
                return;
            const entries = yield fs_extra_1.default.readdir(TEMP_DIR);
            for (const entry of entries) {
                const fullPath = path_1.default.join(TEMP_DIR, entry);
                try {
                    const stat = yield fs_extra_1.default.stat(fullPath);
                    const age = now - stat.mtimeMs;
                    if (age > MAX_AGE) {
                        yield fs_extra_1.default.remove(fullPath);
                    }
                }
                catch (_a) {
                }
            }
        }
        catch (_b) {
        }
    });
}
//# sourceMappingURL=cleanupTempFolder.js.map