"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lab_constants_1 = __importDefault(require("./lab-constants"));
const unpack_1 = __importDefault(require("../../utils/unpack"));
const { pow } = Math;
/*
 * L* [0..100]
 * a [-100..100]
 * b [-100..100]
 */
const lab2rgb = (...args) => {
    args = unpack_1.default(args, 'lab');
    const [l, a, b] = args;
    let x, y, z, r, g, b_;
    y = (l + 16) / 116;
    x = isNaN(a) ? y : y + a / 500;
    z = isNaN(b) ? y : y - b / 200;
    y = lab_constants_1.default.Yn * lab_xyz(y);
    x = lab_constants_1.default.Xn * lab_xyz(x);
    z = lab_constants_1.default.Zn * lab_xyz(z);
    r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z); // D65 -> sRGB
    g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
    b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);
    return [r, g, b_, args.length > 3 ? args[3] : 1];
};
const xyz_rgb = (r) => {
    return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow(r, 1 / 2.4) - 0.055);
};
const lab_xyz = (t) => {
    return t > lab_constants_1.default.t1 ? t * t * t : lab_constants_1.default.t2 * (t - lab_constants_1.default.t0);
};
exports.default = lab2rgb;
//# sourceMappingURL=lab2rgb.js.map