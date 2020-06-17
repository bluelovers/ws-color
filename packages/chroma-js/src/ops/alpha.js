"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
// @ts-ignore
Color_1.default.prototype.alpha = function (a, mutate = false) {
    if (typeof a === 'number') {
        if (mutate) {
            this._rgb[3] = a;
            return this;
        }
        return new Color_1.default([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
    }
    return this._rgb[3];
};
//# sourceMappingURL=alpha.js.map