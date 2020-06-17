"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2hsl_1 = __importDefault(require("./rgb2hsl"));
const hsl2rgb_1 = __importDefault(require("./hsl2rgb"));
Color_1.default.prototype.hsl = function () {
    return rgb2hsl_1.default(this._rgb);
};
chroma_1.default.hsl = (...args) => new Color_1.default(...args, 'hsl');
input_1.default.format.hsl = hsl2rgb_1.default;
input_1.default.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack_1.default(args, 'hsl');
        if (Array.isArray(args) && args.length === 3) {
            return 'hsl';
        }
    },
});
//# sourceMappingURL=index.js.map