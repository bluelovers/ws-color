"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const lch2lab_1 = __importDefault(require("./lch2lab"));
const lab2rgb_1 = __importDefault(require("../lab/lab2rgb"));
const lch2rgb = (...args) => {
    args = unpack_1.default(args, 'lch');
    const [l, c, h] = args;
    const [L, a, b_] = lch2lab_1.default(l, c, h);
    const [r, g, b] = lab2rgb_1.default(L, a, b_);
    return [r, g, b, args.length > 3 ? args[3] : 1];
};
exports.default = lch2rgb;
//# sourceMappingURL=lch2rgb.js.map