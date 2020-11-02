"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lrgb = void 0;
const Color_1 = __importDefault(require("../Color"));
const index_1 = __importDefault(require("./index"));
const { sqrt, pow } = Math;
const lrgb = (col1, col2, f) => {
    const [x1, y1, z1] = col1._rgb;
    const [x2, y2, z2] = col2._rgb;
    return new Color_1.default(sqrt(pow(x1, 2) * (1 - f) + pow(x2, 2) * f), sqrt(pow(y1, 2) * (1 - f) + pow(y2, 2) * f), sqrt(pow(z1, 2) * (1 - f) + pow(z2, 2) * f), 'rgb');
};
exports.lrgb = lrgb;
// register interpolator
index_1.default.lrgb = exports.lrgb;
exports.default = exports.lrgb;
//# sourceMappingURL=lrgb.js.map