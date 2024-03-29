"use strict";
//
// interpolates between a set of colors uzing a bezier spline
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @requires utils lab
const Color_1 = __importDefault(require("../Color"));
require("../io/lab");
const scale_1 = __importDefault(require("./scale"));
const arr_to_colors_1 = __importDefault(require("../utils/arr-to-colors"));
const ts_type_predicates_1 = __importDefault(require("ts-type-predicates"));
const _bezier = function (colors) {
    let I, lab0, lab1, lab2;
    colors = (0, arr_to_colors_1.default)(colors);
    (0, ts_type_predicates_1.default)(colors);
    if (colors.length === 2) {
        // linear interpolation
        [lab0, lab1] = colors.map(c => c.lab());
        I = function (t) {
            const linearInterpolation = (x0, x1) => x0 + (t * (x1 - x0));
            const lab = ([0, 1, 2].map((i) => linearInterpolation(lab0[i], lab1[i])));
            const alpha = linearInterpolation(colors[0].alpha(), colors[1].alpha());
            return new Color_1.default(lab, 'lab').alpha(alpha);
        };
    }
    else if (colors.length === 3) {
        // quadratic bezier interpolation
        [lab0, lab1, lab2] = colors.map(c => c.lab());
        I = function (t) {
            const quadraticInterpolation = (x0, x1, x2) => ((1 - t) * (1 - t) * x0) + (2 * (1 - t) * t * x1) + (t * t * x2);
            const lab = ([0, 1, 2].map((i) => quadraticInterpolation(lab0[i], lab1[i], lab2[i])));
            const alpha = quadraticInterpolation(colors[0].alpha(), colors[1].alpha(), colors[2].alpha());
            return new Color_1.default(lab, 'lab').alpha(alpha);
        };
    }
    else if (colors.length === 4) {
        // cubic bezier interpolation
        let lab3;
        [lab0, lab1, lab2, lab3] = colors.map(c => c.lab());
        I = function (t) {
            const cubicInterpolation = (x0, x1, x2, x3) => ((1 - t) * (1 - t) * (1 - t) * x0) + (3 * (1 - t) * (1 - t) * t * x1) + (3 * (1 - t) * t * t * x2) + (t * t * t * x3);
            const lab = ([0, 1, 2].map((i) => cubicInterpolation(lab0[i], lab1[i], lab2[i], lab3[i])));
            const alpha = cubicInterpolation(colors[0].alpha(), colors[1].alpha(), colors[2].alpha(), colors[3].alpha());
            return new Color_1.default(lab, 'lab').alpha(alpha);
        };
    }
    else if (colors.length === 5) {
        const I0 = _bezier(colors.slice(0, 3));
        const I1 = _bezier(colors.slice(2, 5));
        I = function (t) {
            if (t < 0.5) {
                return I0(t * 2);
            }
            else {
                return I1((t - 0.5) * 2);
            }
        };
    }
    return I;
};
/**
 * Returns a function that
 * [bezier-interpolates]{@link https://www.vis4.net/blog/posts/mastering-multi-hued-color-scales/} between
 * colors in Lab space. The input range of the function is [0..1].
 * You can convert it to a scale instance by calling <code>chroma.bezier(...).scale()</code>
 */
function bezier(colors) {
    const f = _bezier(colors);
    f.scale = () => (0, scale_1.default)(f);
    return f;
}
exports.default = bezier;
//# sourceMappingURL=bezier.js.map