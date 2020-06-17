"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2lch_1 = __importDefault(require("./rgb2lch"));
const lch2rgb_1 = __importDefault(require("./lch2rgb"));
const hcl2rgb_1 = __importDefault(require("./hcl2rgb"));
Color_1.default.prototype.lch = function () { return rgb2lch_1.default(this._rgb); };
Color_1.default.prototype.hcl = function () { return rgb2lch_1.default(this._rgb).reverse(); };
chroma_1.default.lch = (...args) => new Color_1.default(...args, 'lch');
chroma_1.default.hcl = (...args) => new Color_1.default(...args, 'hcl');
input_1.default.format.lch = lch2rgb_1.default;
input_1.default.format.hcl = hcl2rgb_1.default;
['lch', 'hcl'].forEach(m => input_1.default.autodetect.push({
    p: 2,
    test: (...args) => {
        args = unpack_1.default(args, m);
        if (Array.isArray(args) && args.length === 3) {
            return m;
        }
    },
}));
//# sourceMappingURL=index.js.map