"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
Color_1.default.prototype.clipped = function () {
    return this._rgb._clipped || false;
};
//# sourceMappingURL=clipped.js.map