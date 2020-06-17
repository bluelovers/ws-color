"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../../Color"));
const chroma_1 = __importDefault(require("../../chroma"));
const input_1 = __importDefault(require("../input"));
const unpack_1 = __importDefault(require("../../utils/unpack"));
input_1.default.format.gl = (...args) => {
    const rgb = unpack_1.default(args, 'rgba');
    rgb[0] *= 255;
    rgb[1] *= 255;
    rgb[2] *= 255;
    return rgb;
};
chroma_1.default.gl = (...args) => new Color_1.default(...args, 'gl');
Color_1.default.prototype.gl = function () {
    const rgb = this._rgb;
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
};
//# sourceMappingURL=index.js.map