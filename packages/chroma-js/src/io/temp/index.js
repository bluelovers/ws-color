"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2temperature_1 = __importDefault(require("./rgb2temperature"));
const temperature2rgb_1 = __importDefault(require("./temperature2rgb"));
Color_1.default.prototype.temp =
    Color_1.default.prototype.kelvin =
        Color_1.default.prototype.temperature = function () {
            return rgb2temperature_1.default(this._rgb);
        };
chroma_1.default.temp =
    chroma_1.default.kelvin =
        chroma_1.default.temperature = (...args) => new Color_1.default(...args, 'temp');
input_1.default.format.temp =
    input_1.default.format.kelvin =
        input_1.default.format.temperature = temperature2rgb_1.default;
//# sourceMappingURL=index.js.map