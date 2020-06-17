"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2num_1 = __importDefault(require("./rgb2num"));
const num2rgb_1 = __importDefault(require("./num2rgb"));
Color_1.default.prototype.num = function () {
    return rgb2num_1.default(this._rgb);
};
chroma_1.default.num = (...args) => new Color_1.default(...args, 'num');
input_1.default.format.num = num2rgb_1.default;
input_1.default.autodetect.push({
    p: 5,
    test: (...args) => {
        if (args.length === 1 && typeof args[0] === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
            return 'num';
        }
    },
});
//# sourceMappingURL=index.js.map