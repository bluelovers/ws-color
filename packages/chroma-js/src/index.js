"use strict";
// io --> convert colors
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chroma = void 0;
const chroma_1 = __importDefault(require("./chroma"));
exports.chroma = chroma_1.default;
__exportStar(require("./types"), exports);
require("./colors/w3cx11");
const colorbrewer_1 = __importDefault(require("./colors/colorbrewer"));
chroma_1.default.brewer = colorbrewer_1.default;
// feel free to comment out anything to rollup
// a smaller chroma.js built
require("./io/cmyk");
require("./io/css");
require("./io/gl");
require("./io/hcg");
require("./io/hex");
require("./io/hsi");
require("./io/hsl");
require("./io/hsv");
require("./io/lab");
require("./io/lch");
require("./io/named");
require("./io/num");
require("./io/rgb");
require("./io/temp");
// operators --> modify existing Colors
require("./ops/alpha");
require("./ops/clipped");
require("./ops/darken");
require("./ops/get");
require("./ops/luminance");
require("./ops/mix");
require("./ops/premultiply");
require("./ops/saturate");
require("./ops/set");
require("./ops/rand");
// interpolators
require("./interpolator/rgb");
require("./interpolator/lrgb");
require("./interpolator/lab");
require("./interpolator/lch");
require("./interpolator/num");
require("./interpolator/hcg");
require("./interpolator/hsi");
require("./interpolator/hsl");
require("./interpolator/hsv");
// generators -- > create new colors
const average_1 = __importDefault(require("./generator/average"));
const bezier_1 = __importDefault(require("./generator/bezier"));
const blend_1 = __importDefault(require("./generator/blend"));
const cubehelix_1 = __importDefault(require("./generator/cubehelix"));
const mix_1 = __importDefault(require("./generator/mix"));
const scale_1 = __importDefault(require("./generator/scale"));
// other utility methods
const analyze_1 = require("./utils/analyze");
const contrast_1 = __importDefault(require("./utils/contrast"));
const delta_e_1 = __importDefault(require("./utils/delta-e"));
const distance_1 = __importDefault(require("./utils/distance"));
const valid_1 = __importDefault(require("./utils/valid"));
const scales_1 = __importDefault(require("./utils/scales"));
chroma_1.default.average = average_1.default;
chroma_1.default.bezier = bezier_1.default;
chroma_1.default.blend = blend_1.default;
chroma_1.default.cubehelix = cubehelix_1.default;
chroma_1.default.mix = chroma_1.default.interpolate = mix_1.default;
chroma_1.default.scale = scale_1.default;
// other utility methods
chroma_1.default.analyze = analyze_1.analyze;
chroma_1.default.contrast = contrast_1.default;
chroma_1.default.deltaE = delta_e_1.default;
chroma_1.default.distance = distance_1.default;
chroma_1.default.limits = analyze_1.limits;
chroma_1.default.valid = valid_1.default;
// scale
chroma_1.default.scales = scales_1.default;
exports.default = chroma_1.default;
//# sourceMappingURL=index.js.map