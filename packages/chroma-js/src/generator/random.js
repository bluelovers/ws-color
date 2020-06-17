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
exports.random = void 0;
const Color_1 = __importDefault(require("../Color"));
const rand_1 = __importStar(require("../utils/rand"));
const chroma_1 = __importDefault(require("../chroma"));
function random(options) {
    if (options instanceof Color_1.default || Array.isArray(options) || typeof options === 'string' || typeof options !== 'object') {
        // @ts-ignore
        options = {
            rgba: options,
        };
    }
    // @ts-ignore
    if (options === null || options === void 0 ? void 0 : options.rgba) {
        return new Color_1.default(rand_1.default(options), 'rgba');
    }
    let code = '#' + rand_1.randomHex(options);
    return new Color_1.default(code, 'hex');
}
exports.random = random;
chroma_1.default.random = chroma_1.default.rand = random;
exports.default = random;
//# sourceMappingURL=random.js.map