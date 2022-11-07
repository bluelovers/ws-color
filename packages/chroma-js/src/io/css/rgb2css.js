"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const last_1 = __importDefault(require("../../utils/last"));
const hsl2css_1 = __importDefault(require("./hsl2css"));
const rgb2hsl_1 = __importDefault(require("../hsl/rgb2hsl"));
const { round } = Math;
/*
 * supported arguments:
 * - rgb2css(r,g,b)
 * - rgb2css(r,g,b,a)
 * - rgb2css([r,g,b], mode)
 * - rgb2css([r,g,b,a], mode)
 * - rgb2css({r,g,b,a}, mode)
 */
const rgb2css = (...args) => {
    const rgba = (0, unpack_1.default)(args, 'rgba');
    let mode = (0, last_1.default)(args) || 'rgb';
    if (mode.substr(0, 3) == 'hsl') {
        return (0, hsl2css_1.default)((0, rgb2hsl_1.default)(rgba), mode);
    }
    rgba[0] = round(rgba[0]);
    rgba[1] = round(rgba[1]);
    rgba[2] = round(rgba[2]);
    if (mode === 'rgba' || (rgba.length > 3 && rgba[3] < 1)) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = 'rgba';
    }
    return `${mode}(${rgba.slice(0, mode === 'rgb' ? 3 : 4).join(',')})`;
};
exports.default = rgb2css;
//# sourceMappingURL=rgb2css.js.map