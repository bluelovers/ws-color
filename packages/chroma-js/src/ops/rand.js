"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const rand_1 = __importDefault(require("../utils/rand"));
require("../io/rgb");
// @ts-ignore
Color_1.default.prototype.rand = function (options) {
    return new Color_1.default(rand_1.default(this._rgb, options), 'rgba');
};
console.log(new Color_1.default().toString());
//# sourceMappingURL=rand.js.map