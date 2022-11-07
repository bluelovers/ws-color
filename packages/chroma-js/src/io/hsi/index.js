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
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importStar(require("../input"));
const rgb2hsi_1 = __importDefault(require("./rgb2hsi"));
const hsi2rgb_1 = __importDefault(require("./hsi2rgb"));
Color_1.default.prototype.hsi = function () {
    return (0, rgb2hsi_1.default)(this._rgb);
};
chroma_1.default.hsi = (...args) => new Color_1.default(...args, 'hsi');
input_1.default.format.hsi = hsi2rgb_1.default;
(0, input_1.setupInputAutodetect)({
    p: 2,
    test: (...args) => {
        args = (0, unpack_1.default)(args, 'hsi');
        if (Array.isArray(args) && args.length === 3) {
            return 'hsi';
        }
    },
});
//# sourceMappingURL=index.js.map