"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/hcg");
const _hsx_1 = __importDefault(require("./_hsx"));
const hcg = (col1, col2, f) => {
    return _hsx_1.default(col1, col2, f, 'hcg');
};
// register interpolator
const index_1 = __importDefault(require("./index"));
index_1.default.hcg = hcg;
exports.default = hcg;
//# sourceMappingURL=hcg.js.map