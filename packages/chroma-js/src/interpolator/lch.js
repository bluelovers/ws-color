"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/lch");
const _hsx_1 = __importDefault(require("./_hsx"));
const lch = (col1, col2, f) => {
    return _hsx_1.default(col1, col2, f, 'lch');
};
// register interpolator
const index_1 = __importDefault(require("./index"));
index_1.default.lch = lch;
index_1.default.hcl = lch;
exports.default = lch;
//# sourceMappingURL=lch.js.map