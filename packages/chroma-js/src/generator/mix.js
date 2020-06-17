"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const interpolator_1 = __importDefault(require("../interpolator"));
const type_1 = __importDefault(require("../utils/type"));
const mix = (col1, col2, f = 0.5, ...rest) => {
    let mode = rest[0] || 'lrgb';
    if (!interpolator_1.default[mode] && !rest.length) {
        // fall back to the first supported mode
        mode = Object.keys(interpolator_1.default)[0];
    }
    if (!interpolator_1.default[mode]) {
        throw new Error(`interpolation mode ${mode} is not defined`);
    }
    if (type_1.default(col1) !== 'object')
        col1 = new Color_1.default(col1);
    if (type_1.default(col2) !== 'object')
        col2 = new Color_1.default(col2);
    return interpolator_1.default[mode](col1, col2, f)
        .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
};
exports.default = mix;
//# sourceMappingURL=mix.js.map