"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importStar(require("../input"));
const rgb2css_1 = __importDefault(require("./rgb2css"));
const css2rgb_1 = __importDefault(require("./css2rgb"));
Color_1.default.prototype.css = function (mode) {
    return (0, rgb2css_1.default)(this._rgb, mode);
};
chroma_1.default.css = (...args) => new Color_1.default(...args, 'css');
input_1.default.format.css = css2rgb_1.default;
(0, input_1.setupInputAutodetect)({
    p: 5,
    test: (h, ...rest) => {
        if (!rest.length && typeof h === 'string' && css2rgb_1.default.test(h)) {
            return 'css';
        }
    },
});
//# sourceMappingURL=index.js.map