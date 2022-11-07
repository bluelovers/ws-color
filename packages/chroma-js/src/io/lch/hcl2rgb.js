"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const lch2rgb_1 = __importDefault(require("./lch2rgb"));
const hcl2rgb = (...args) => {
    const hcl = (0, unpack_1.default)(args, 'hcl').reverse();
    return (0, lch2rgb_1.default)(...hcl);
};
exports.default = hcl2rgb;
//# sourceMappingURL=hcl2rgb.js.map