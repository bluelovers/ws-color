"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/hsi");
const _hsx_1 = __importDefault(require("./_hsx"));
const hsi = (col1, col2, f) => {
    return (0, _hsx_1.default)(col1, col2, f, 'hsi');
};
// register interpolator
const index_1 = __importDefault(require("./index"));
index_1.default.hsi = hsi;
exports.default = hsi;
//# sourceMappingURL=hsi.js.map