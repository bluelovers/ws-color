"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/lab");
const Color_1 = __importDefault(require("../Color"));
const lab = (col1, col2, f) => {
    const xyz0 = col1.lab();
    const xyz1 = col2.lab();
    return new Color_1.default(xyz0[0] + f * (xyz1[0] - xyz0[0]), xyz0[1] + f * (xyz1[1] - xyz0[1]), xyz0[2] + f * (xyz1[2] - xyz0[2]), 'lab');
};
// register interpolator
const index_1 = __importDefault(require("./index"));
index_1.default.lab = lab;
exports.default = lab;
//# sourceMappingURL=lab.js.map