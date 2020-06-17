"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const unpack_1 = __importDefault(require("../../utils/unpack"));
const rgb2cmyk_1 = __importDefault(require("./rgb2cmyk"));
const cmyk2rgb_1 = __importDefault(require("./cmyk2rgb"));
Color_1.default.prototype.cmyk = function () {
    return rgb2cmyk_1.default(this._rgb);
};
chroma_1.default.cmyk = (...args) => new Color_1.default(...args, 'cmyk');
input_1.default.format.cmyk = cmyk2rgb_1.default;
input_1.default.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack_1.default(args, 'cmyk');
        if (Array.isArray(args) && args.length === 4) {
            return 'cmyk';
        }
    },
});
//# sourceMappingURL=index.js.map