"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const rgb2lab_1 = __importDefault(require("../lab/rgb2lab"));
const lab2lch_1 = __importDefault(require("./lab2lch"));
const rgb2lch = (...args) => {
    const [r, g, b] = (0, unpack_1.default)(args, 'rgb');
    const [l, a, b_] = (0, rgb2lab_1.default)(r, g, b);
    return (0, lab2lch_1.default)(l, a, b_);
};
exports.default = rgb2lch;
//# sourceMappingURL=rgb2lch.js.map