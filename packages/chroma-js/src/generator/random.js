"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const rand_1 = require("../utils/rand");
const colors_1 = __importDefault(require("../colors"));
exports.default = (options) => {
    if (options === null || options === void 0 ? void 0 : options.rgba) {
        return new Color_1.default(colors_1.default._default, 'rgba');
    }
    let code = '#' + rand_1.randomHex(options);
    return new Color_1.default(code, 'hex');
};
//# sourceMappingURL=random.js.map