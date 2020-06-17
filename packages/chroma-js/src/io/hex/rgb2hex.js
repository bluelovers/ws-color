"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const last_1 = __importDefault(require("../../utils/last"));
const { round } = Math;
function rgb2hex(...args) {
    let [r, g, b, a] = unpack_1.default(args, 'rgba');
    let mode = last_1.default(args) || 'auto';
    if (a === undefined)
        a = 1;
    if (mode === 'auto') {
        mode = a < 1 ? 'rgba' : 'rgb';
    }
    r = round(r);
    g = round(g);
    b = round(b);
    const u = r << 16 | g << 8 | b;
    let str = "000000" + u.toString(16); //#.toUpperCase();
    str = str.substr(str.length - 6);
    let hxa = '0' + round(a * 255).toString(16);
    hxa = hxa.substr(hxa.length - 2);
    switch (mode.toLowerCase()) {
        case 'rgba':
            return `#${str}${hxa}`;
        case 'argb':
            return `#${hxa}${str}`;
        default:
            return `#${str}`;
    }
}
exports.default = rgb2hex;
//# sourceMappingURL=rgb2hex.js.map