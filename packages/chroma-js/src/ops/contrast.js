"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const util_1 = require("../utils/contrast/util");
Color_1.default.prototype.contrastFront = function (options) {
    return new Color_1.default(util_1.contrastFront(this.rgba(), options));
};
//# sourceMappingURL=contrast.js.map