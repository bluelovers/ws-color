"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const w3cx11_1 = __importDefault(require("../../colors/w3cx11"));
const hex2rgb_1 = __importDefault(require("../hex/hex2rgb"));
const rgb2hex_1 = __importDefault(require("../hex/rgb2hex"));
Color_1.default.prototype.name = function () {
    const hex = rgb2hex_1.default(this._rgb, 'rgb');
    for (let n of Object.keys(w3cx11_1.default)) {
        if (w3cx11_1.default[n] === hex)
            return n.toLowerCase();
    }
    return hex;
};
input_1.default.format.named = (name) => {
    name = name.toLowerCase();
    if (w3cx11_1.default[name])
        return hex2rgb_1.default(w3cx11_1.default[name]);
    throw new Error('unknown color name: ' + name);
};
input_1.default.autodetect.push({
    p: 5,
    test: (h, ...rest) => {
        if (!rest.length && typeof h === 'string' && w3cx11_1.default[h.toLowerCase()]) {
            return 'named';
        }
    },
});
//# sourceMappingURL=index.js.map