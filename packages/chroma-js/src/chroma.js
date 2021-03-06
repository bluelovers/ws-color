"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chroma = void 0;
const Color_1 = __importDefault(require("./Color"));
const index_1 = __importDefault(require("./colors/index"));
// @ts-ignore
const chroma = (...args) => {
    return new exports.chroma.Color(...args);
};
exports.chroma = chroma;
// colors
exports.chroma.colors = index_1.default;
exports.chroma.Color = Color_1.default;
exports.chroma.version = '@@version';
exports.chroma.chroma = exports.chroma;
exports.chroma.default = exports.chroma;
Object.defineProperty(exports.chroma, "__esModule", { value: true });
exports.default = exports.chroma;
//# sourceMappingURL=chroma.js.map