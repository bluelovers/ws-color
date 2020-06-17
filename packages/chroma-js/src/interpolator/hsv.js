"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/hsv");
const _hsx_1 = __importDefault(require("./_hsx"));
const hsv = (col1, col2, f) => {
    return _hsx_1.default(col1, col2, f, 'hsv');
};
// register interpolator
const index_1 = __importDefault(require("./index"));
index_1.default.hsv = hsv;
exports.default = hsv;
//# sourceMappingURL=hsv.js.map