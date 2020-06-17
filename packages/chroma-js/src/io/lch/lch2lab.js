"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const utils_1 = require("../../utils");
const { sin, cos } = Math;
const lch2lab = (...args) => {
    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.

    A saturation multiplier was added by Gregor Aisch
    */
    let [l, c, h] = unpack_1.default(args, 'lch');
    if (isNaN(h))
        h = 0;
    h = h * utils_1.DEG2RAD;
    return [l, cos(h) * c, sin(h) * c];
};
exports.default = lch2lab;
//# sourceMappingURL=lch2lab.js.map