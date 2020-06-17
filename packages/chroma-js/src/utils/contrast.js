"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
require("../ops/luminance");
function contrast(a, b) {
    // WCAG contrast ratio
    // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
    a = new Color_1.default(a);
    b = new Color_1.default(b);
    const l1 = a.luminance();
    const l2 = b.luminance();
    return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}
exports.default = contrast;
//# sourceMappingURL=contrast.js.map