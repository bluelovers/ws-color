"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
/**
 * simple Euclidean distance
 *
 * Computes the eucledian distance between two colors in a given color space (default is 'lab').
 * {@link https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions}
 */
function distance(a, b, mode = 'lab') {
    // Delta E (CIE 1976)
    // see http://www.brucelindbloom.com/index.html?Equations.html
    a = new Color_1.default(a);
    b = new Color_1.default(b);
    const l1 = a.get(mode);
    const l2 = b.get(mode);
    let sum_sq = 0;
    for (let i in l1) {
        const d = (l1[i] || 0) - (l2[i] || 0);
        sum_sq += d * d;
    }
    return Math.sqrt(sum_sq);
}
;
exports.default = distance;
//# sourceMappingURL=distance.js.map