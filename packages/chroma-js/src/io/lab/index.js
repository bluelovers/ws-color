"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2lab_1 = __importDefault(require("./rgb2lab"));
const lab2rgb_1 = __importDefault(require("./lab2rgb"));
Color_1.default.prototype.lab = function () {
    return rgb2lab_1.default(this._rgb);
};
chroma_1.default.lab = (...args) => new Color_1.default(...args, 'lab');
input_1.default.format.lab = lab2rgb_1.default;
input_1.default.autodetect.push({
    p: 2,
    test(...args) {
        args = unpack_1.default(args, 'lab');
        if (Array.isArray(args) && args.length === 3) {
            return 'lab';
        }
    },
});
//# sourceMappingURL=index.js.map