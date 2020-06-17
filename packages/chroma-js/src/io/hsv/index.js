"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2hsv_1 = __importDefault(require("./rgb2hsv"));
const hsv2rgb_1 = __importDefault(require("./hsv2rgb"));
Color_1.default.prototype.hsv = function () {
    return rgb2hsv_1.default(this._rgb);
};
chroma_1.default.hsv = (...args) => new Color_1.default(...args, 'hsv');
input_1.default.format.hsv = hsv2rgb_1.default;
input_1.default.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack_1.default(args, 'hsv');
        if (Array.isArray(args) && args.length === 3) {
            return 'hsv';
        }
    },
});
//# sourceMappingURL=index.js.map