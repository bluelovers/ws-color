"use strict";
// io --> convert colors
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chroma = void 0;
const chroma_1 = __importDefault(require("./chroma"));
exports.chroma = chroma_1.default;
__exportStar(require("./types"), exports);
// feel free to comment out anything to rollup
// a smaller chroma.js built
// io --> convert colors
require("./io/css");
require("./io/hex");
require("./io/hsl");
require("./io/lab");
require("./io/rgb");
// operators --> modify existing Colors
require("./ops/alpha");
require("./ops/darken");
require("./ops/get");
require("./ops/mix");
require("./ops/set");
// interpolators
require("./interpolator/lrgb");
// generators -- > create new colors
const mix_1 = __importDefault(require("./generator/mix"));
// other utility methods
const valid_1 = __importDefault(require("./utils/valid"));
chroma_1.default.mix = chroma_1.default.interpolate = mix_1.default;
// other utility methods
chroma_1.default.valid = valid_1.default;
exports.default = chroma_1.default;
//# sourceMappingURL=index-light.js.map