"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
Color_1.default.prototype.premultiply = function (mutate = false) {
    const rgb = this._rgb;
    const a = rgb[3];
    if (mutate) {
        this._rgb = [rgb[0] * a, rgb[1] * a, rgb[2] * a, a];
        return this;
    }
    else {
        return new Color_1.default([rgb[0] * a, rgb[1] * a, rgb[2] * a, a], 'rgb');
    }
};
//# sourceMappingURL=premultiply.js.map