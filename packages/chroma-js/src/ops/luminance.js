"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const { pow } = Math;
const EPS = 1e-7;
const MAX_ITER = 20;
// @ts-ignore
Color_1.default.prototype.luminance = function (lum) {
    if (typeof lum === 'number') {
        if (lum === 0) {
            // return pure black
            return new Color_1.default([0, 0, 0, this._rgb[3]], 'rgb');
        }
        if (lum === 1) {
            // return pure white
            return new Color_1.default([255, 255, 255, this._rgb[3]], 'rgb');
        }
        // compute new color using...
        let cur_lum = this.luminance();
        let mode = 'rgb';
        let max_iter = MAX_ITER;
        const test = (low, high) => {
            const mid = low.interpolate(high, 0.5, mode);
            const lm = mid.luminance();
            if (Math.abs(lum - lm) < EPS || !max_iter--) {
                // close enough
                return mid;
            }
            return lm > lum ? test(low, mid) : test(mid, high);
        };
        const rgb = (cur_lum > lum ? test(new Color_1.default([0, 0, 0]), this) : test(this, new Color_1.default([255, 255, 255]))).rgb();
        return new Color_1.default([...rgb, this._rgb[3]]);
    }
    return rgb2luminance(...(this._rgb).slice(0, 3));
};
const rgb2luminance = (r, g, b) => {
    // relative luminance
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
    r = luminance_x(r);
    g = luminance_x(g);
    b = luminance_x(b);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const luminance_x = (x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : pow((x + 0.055) / 1.055, 2.4);
};
//# sourceMappingURL=luminance.js.map