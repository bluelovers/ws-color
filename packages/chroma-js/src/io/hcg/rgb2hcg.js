"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const rgb2hcg = (...args) => {
    const [r, g, b] = (0, unpack_1.default)(args, 'rgb');
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    const c = delta * 100 / 255;
    const _g = min / (255 - delta) * 100;
    let h;
    if (delta === 0) {
        h = Number.NaN;
    }
    else {
        if (r === max)
            h = (g - b) / delta;
        if (g === max)
            h = 2 + (b - r) / delta;
        if (b === max)
            h = 4 + (r - g) / delta;
        h *= 60;
        if (h < 0)
            h += 360;
    }
    return [h, c, _g];
};
exports.default = rgb2hcg;
//# sourceMappingURL=rgb2hcg.js.map