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
const Color_1 = __importDefault(require("../../Color"));
const input_1 = require("../input");
const rgb2hex_1 = __importDefault(require("../hex/rgb2hex"));
const named2rgb_1 = __importStar(require("./named2rgb"));
Color_1.default.prototype.named = function () {
    var _a, _b, _c;
    if ((0, named2rgb_1.rgba_is_transparent)(this._rgb)) {
        return 'transparent';
    }
    const hex = (0, rgb2hex_1.default)(this._rgb, 'rgb');
    if (this._rgb[0] === null || this._rgb[1] === null || this._rgb[2] === null) {
        return hex;
    }
    return (_c = (_b = (_a = (0, named2rgb_1.hex2name)(hex)) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (this._rgb[0] === null && hex);
};
(0, input_1.setupInputFormat)('named', (name) => {
    return (0, named2rgb_1.default)(name);
});
(0, input_1.setupInputAutodetect)({
    p: 5,
    test: (name, ...rest) => {
        var _a;
        if (!rest.length && typeof name === 'string' && ((_a = (0, named2rgb_1._named2rgb)(name)) === null || _a === void 0 ? void 0 : _a.length)) {
            return 'named';
        }
    },
});
//# sourceMappingURL=index.js.map