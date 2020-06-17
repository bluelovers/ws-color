"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const mix_1 = __importDefault(require("../generator/mix"));
Color_1.default.prototype.mix =
    Color_1.default.prototype.interpolate = function (col2, f = 0.5, ...rest) {
        return mix_1.default(this, col2, f, ...rest);
    };
//# sourceMappingURL=mix.js.map