"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2css_1 = __importDefault(require("./rgb2css"));
const css2rgb_1 = __importDefault(require("./css2rgb"));
Color_1.default.prototype.css = function (mode) {
    return rgb2css_1.default(this._rgb, mode);
};
chroma_1.default.css = (...args) => new Color_1.default(...args, 'css');
input_1.default.format.css = css2rgb_1.default;
input_1.default.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
        if (!rest.length && typeof h === 'string' && css2rgb_1.default.test(h)) {
            return 'css';
        }
    },
});
//# sourceMappingURL=index.js.map