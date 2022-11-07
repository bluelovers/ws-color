"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const utils_1 = require("../../utils");
const { sqrt, atan2, round } = Math;
const lab2lch = (...args) => {
    const [l, a, b] = (0, unpack_1.default)(args, 'lab');
    const c = sqrt(a * a + b * b);
    let h = (atan2(b, a) * utils_1.RAD2DEG + 360) % 360;
    if (round(c * 10000) === 0)
        h = Number.NaN;
    return [l, c, h];
};
exports.default = lab2lch;
//# sourceMappingURL=lab2lch.js.map