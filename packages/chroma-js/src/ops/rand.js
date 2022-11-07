"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const rand_1 = __importDefault(require("../utils/rand"));
require("../io/rgb");
// @ts-ignore
Color_1.default.prototype.rand = function (options = {}) {
    options.rgba = this._rgb;
    return new Color_1.default((0, rand_1.default)(options), 'rgba');
};
//# sourceMappingURL=rand.js.map