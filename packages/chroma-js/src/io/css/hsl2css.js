"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const last_1 = __importDefault(require("../../utils/last"));
const rnd = (a) => Math.round(a * 100) / 100;
/*
 * supported arguments:
 * - hsl2css(h,s,l)
 * - hsl2css(h,s,l,a)
 * - hsl2css([h,s,l], mode)
 * - hsl2css([h,s,l,a], mode)
 * - hsl2css({h,s,l,a}, mode)
 */
const hsl2css = (...args) => {
    const hsla = unpack_1.default(args, 'hsla');
    let mode = last_1.default(args) || 'lsa';
    hsla[0] = rnd(hsla[0] || 0);
    hsla[1] = rnd(hsla[1] * 100) + '%';
    hsla[2] = rnd(hsla[2] * 100) + '%';
    if (mode === 'hsla' || (hsla.length > 3 && hsla[3] < 1)) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode = 'hsla';
    }
    else {
        hsla.length = 3;
    }
    return `${mode}(${hsla.join(',')})`;
};
exports.default = hsl2css;
//# sourceMappingURL=hsl2css.js.map