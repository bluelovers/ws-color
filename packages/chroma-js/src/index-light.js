"use strict";
// io --> convert colors
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("./chroma"));
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