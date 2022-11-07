"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const rgb2num = (...args) => {
    const [r, g, b] = (0, unpack_1.default)(args, 'rgb');
    return (r << 16) + (g << 8) + b;
};
exports.default = rgb2num;
//# sourceMappingURL=rgb2num.js.map