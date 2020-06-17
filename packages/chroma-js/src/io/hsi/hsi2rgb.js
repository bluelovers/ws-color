"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const utils_1 = require("../../utils");
const limit_1 = __importDefault(require("../../utils/limit"));
const { cos } = Math;
/*
 * hue [0..360]
 * saturation [0..1]
 * intensity [0..1]
 */
const hsi2rgb = (...args) => {
    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
    */
    args = unpack_1.default(args, 'hsi');
    let [h, s, i] = args;
    let r, g, b;
    if (isNaN(h))
        h = 0;
    if (isNaN(s))
        s = 0;
    // normalize hue
    if (h > 360)
        h -= 360;
    if (h < 0)
        h += 360;
    h /= 360;
    if (h < 1 / 3) {
        b = (1 - s) / 3;
        r = (1 + s * cos(utils_1.TWOPI * h) / cos(utils_1.PITHIRD - utils_1.TWOPI * h)) / 3;
        g = 1 - (b + r);
    }
    else if (h < 2 / 3) {
        h -= 1 / 3;
        r = (1 - s) / 3;
        g = (1 + s * cos(utils_1.TWOPI * h) / cos(utils_1.PITHIRD - utils_1.TWOPI * h)) / 3;
        b = 1 - (r + g);
    }
    else {
        h -= 2 / 3;
        g = (1 - s) / 3;
        b = (1 + s * cos(utils_1.TWOPI * h) / cos(utils_1.PITHIRD - utils_1.TWOPI * h)) / 3;
        r = 1 - (g + b);
    }
    r = limit_1.default(i * r * 3);
    g = limit_1.default(i * g * 3);
    b = limit_1.default(i * b * 3);
    return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
};
exports.default = hsi2rgb;
//# sourceMappingURL=hsi2rgb.js.map