"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2hex_1 = __importDefault(require("./rgb2hex"));
const hex2rgb_1 = __importDefault(require("./hex2rgb"));
Color_1.default.prototype.hex = function (mode) {
    return rgb2hex_1.default(this._rgb, mode);
};
chroma_1.default.hex = (...args) => new Color_1.default(...args, 'hex');
input_1.default.format.hex = hex2rgb_1.default;
input_1.default.autodetect.push({
    p: 4,
    test: (h, ...rest) => {
        if (!rest.length && typeof h === 'string' && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0) {
            return 'hex';
        }
    },
});
//# sourceMappingURL=index.js.map