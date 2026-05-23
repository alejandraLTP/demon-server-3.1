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
exports.extractUFF = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const unzipper_1 = __importDefault(require("unzipper"));
const path_1 = __importDefault(require("path"));
const extractUFF = (filePath, destinationPath) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_extra_1.default
        .createReadStream(filePath)
        .pipe(unzipper_1.default.Extract({ path: destinationPath }))
        .promise();
    const getAllFiles = (dir) => __awaiter(void 0, void 0, void 0, function* () {
        const dirents = yield fs_extra_1.default.readdir(dir, { withFileTypes: true });
        const files = yield Promise.all(dirents.map((dirent) => {
            const res = path_1.default.join(dir, dirent.name);
            return dirent.isDirectory() ? getAllFiles(res) : Promise.resolve([res]);
        }));
        return files.flat();
    });
    const allFiles = yield getAllFiles(destinationPath);
    for (const file of allFiles) {
        if (file.toLowerCase().endsWith(".xml")) {
            return yield fs_extra_1.default.readFile(file, "utf-8");
        }
    }
    return null;
});
exports.extractUFF = extractUFF;
//# sourceMappingURL=ExtractXML.js.map