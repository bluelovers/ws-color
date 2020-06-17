"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unpack_1 = __importDefault(require("../../utils/unpack"));
const chroma_1 = __importDefault(require("../../chroma"));
const Color_1 = __importDefault(require("../../Color"));
const input_1 = __importDefault(require("../input"));
const rgb2hcg_1 = __importDefault(require("./rgb2hcg"));
const hcg2rgb_1 = __importDefault(require("./hcg2rgb"));
Color_1.default.prototype.hcg = function () {
    return rgb2hcg_1.default(this._rgb);
};
chroma_1.default.hcg = (...args) => new Color_1.default(...args, 'hcg');
input_1.default.format.hcg = hcg2rgb_1.default;
input_1.default.autodetect.push({
    p: 1,
    test: (...args) => {
        args = unpack_1.default(args, 'hcg');
        if (Array.isArray(args) && args.length === 3) {
            return 'hcg';
        }
    },
});
//# sourceMappingURL=index.js.map