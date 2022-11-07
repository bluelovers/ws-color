"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = require("../input");
const rgb2temperature_1 = __importDefault(require("./rgb2temperature"));
const temperature2rgb_1 = __importDefault(require("./temperature2rgb"));
/*
Color.prototype.temp =
    Color.prototype.kelvin =
        Color.prototype.temperature = function ()
        {
            return rgb2temperature(this._rgb);
        };

chroma.temp =
    chroma.kelvin =
        chroma.temperature = (...args) => new Color(...args, 'temp');

input.format.temp =
    input.format.kelvin =
        input.format.temperature = temperature2rgb;
*/
[
    'temp',
    'kelvin',
    'temperature',
]
    .forEach(field => {
    Color_1.default.prototype[field] = function () {
        return (0, rgb2temperature_1.default)(this._rgb);
    };
    /**
     * Returns a color from the color temperature scale.
     * light 2000K, bright sunlight 6000K.
     * Based on Neil Bartlett's implementation.
     * https://github.com/neilbartlett/color-temperature
     */
    chroma_1.default[field] = (...args) => new Color_1.default(...args, 'temp');
    (0, input_1.setupInputFormat)(field, temperature2rgb_1.default);
});
//# sourceMappingURL=index.js.map