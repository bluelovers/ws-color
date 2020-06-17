"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2hex_1 = __importDefault(require("../hex/rgb2hex"));
const named2rgb_1 = __importStar(require("./named2rgb"));
Color_1.default.prototype.name = function () {
    var _a, _b, _c;
    const hex = rgb2hex_1.default(this._rgb, 'rgb');
    return (_c = (_b = (_a = named2rgb_1.hex2name(hex)) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : hex;
};
input_1.default.format.named = (name) => {
    return named2rgb_1.default(name);
};
input_1.default.autodetect.push({
    p: 5,
    test: (name, ...rest) => {
        var _a;
        if (!rest.length && typeof name === 'string' && ((_a = named2rgb_1._named2rgb(name)) === null || _a === void 0 ? void 0 : _a.length)) {
            return 'named';
        }
    },
});
//# sourceMappingURL=index.js.map