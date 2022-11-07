"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = require("../input");
const rgb2lch_1 = __importDefault(require("./rgb2lch"));
const lch2rgb_1 = __importDefault(require("./lch2rgb"));
const hcl2rgb_1 = __importDefault(require("./hcl2rgb"));
Color_1.default.prototype.lch = function () { return (0, rgb2lch_1.default)(this._rgb); };
Color_1.default.prototype.hcl = function () { return (0, rgb2lch_1.default)(this._rgb).reverse(); };
//chroma.lch = (...args) => new Color(...args, 'lch');
//chroma.hcl = (...args) => new Color(...args, 'hcl');
//input.format.lch = lch2rgb;
//input.format.hcl = hcl2rgb;
(0, input_1.setupInputFormat)('lch', lch2rgb_1.default);
(0, input_1.setupInputFormat)('hcl', hcl2rgb_1.default);
['lch', 'hcl'].forEach(m => {
    chroma_1.default[m] = (...args) => new Color_1.default(...args, m);
    (0, input_1.setupInputAutodetect)({
        p: 2,
        test: (...args) => {
            args = (0, unpack_1.default)(args, m);
            if (Array.isArray(args) && args.length === 3) {
                return m;
            }
        },
    });
});
//# sourceMappingURL=index.js.map