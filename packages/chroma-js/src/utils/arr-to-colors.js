"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
function arr2colors(colors, ...argv) {
    return colors.map(c => new Color_1.default(c, ...argv));
}
exports.default = arr2colors;
//# sourceMappingURL=arr-to-colors.js.map