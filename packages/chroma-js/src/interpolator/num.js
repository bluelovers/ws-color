"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/num");
const Color_1 = __importDefault(require("../Color"));
const num = (col1, col2, f) => {
    const c1 = col1.num();
    const c2 = col2.num();
    return new Color_1.default(c1 + f * (c2 - c1), 'num');
};
// register interpolator
const index_1 = __importDefault(require("./index"));
index_1.default.num = num;
exports.default = num;
//# sourceMappingURL=num.js.map