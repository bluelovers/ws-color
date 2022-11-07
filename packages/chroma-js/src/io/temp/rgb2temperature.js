"use strict";
/*
 * Based on implementation by Neil Bartlett
 * https://github.com/neilbartlett/color-temperature
 **/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const temperature2rgb_1 = __importDefault(require("./temperature2rgb"));
const unpack_1 = __importDefault(require("../../utils/unpack"));
const { round } = Math;
const rgb2temperature = (...args) => {
    const rgb = (0, unpack_1.default)(args, 'rgb');
    const r = rgb[0], b = rgb[2];
    let minTemp = 1000;
    let maxTemp = 40000;
    const eps = 0.4;
    let temp;
    while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;
        const rgb = (0, temperature2rgb_1.default)(temp);
        if ((rgb[2] / rgb[0]) >= (b / r)) {
            maxTemp = temp;
        }
        else {
            minTemp = temp;
        }
    }
    return round(temp);
};
exports.default = rgb2temperature;
//# sourceMappingURL=rgb2temperature.js.map