"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = require("../input");
const unpack_1 = __importDefault(require("../../utils/unpack"));
const { round } = Math;
Color_1.default.prototype.rgb = function (rnd = true) {
    if (rnd === false)
        return this._rgb.slice(0, 3);
    return this._rgb.slice(0, 3).map(round);
};
Color_1.default.prototype.rgba = function (rnd = true) {
    return this._rgb.slice(0, 4).map((v, i) => {
        return i < 3 ? (rnd === false ? v : round(v)) : v;
    });
};
chroma_1.default.rgba = chroma_1.default.rgb = (...args) => new Color_1.default(...args, 'rgb');
/*
input.format.rgba = input.format.rgb = (...args) =>
{
    const rgba = unpack(args, 'rgba');
    rgba[3] = rgba[3] ?? 1;
    return rgba;
};
 */
(0, input_1.setupInputFormat)([
    'rgba',
    'rgb',
], (...args) => {
    var _a;
    const rgba = (0, unpack_1.default)(args, 'rgba');
    rgba[3] = (_a = rgba[3]) !== null && _a !== void 0 ? _a : 1;
    return rgba;
});
(0, input_1.setupInputAutodetect)({
    p: 3,
    test: (...args) => {
        args = (0, unpack_1.default)(args, 'rgba');
        if (Array.isArray(args) && (args.length === 3 ||
            args.length === 4 && typeof args[3] === 'number' && args[3] >= 0 && args[3] <= 1)) {
            return 'rgb';
        }
    },
});
//# sourceMappingURL=index.js.map