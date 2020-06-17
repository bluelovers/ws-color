"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// some pre-defined color scales:
const chroma_1 = __importDefault(require("../chroma"));
require("../io/hsl");
const scale_1 = __importDefault(require("../generator/scale"));
const scales = {
    cool() { return scale_1.default([chroma_1.default.hsl(180, 1, .9), chroma_1.default.hsl(250, .7, .4)]); },
    hot() { return scale_1.default(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb'); },
};
exports.default = scales;
//# sourceMappingURL=scales.js.map