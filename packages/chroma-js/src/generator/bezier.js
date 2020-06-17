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
    colors = arr_to_colors_1.default(colors);
    ts_type_predicates_1.default(colors);
    if (colors.length === 2) {
        // linear interpolation
        [lab0, lab1] = colors.map(c => c.lab());
        I = function (t) {
            const lab = ([0, 1, 2].map((i) => lab0[i] + (t * (lab1[i] - lab0[i]))));
            return new Color_1.default(lab, 'lab');
        };
    }
    else if (colors.length === 3) {
        // quadratic bezier interpolation
        [lab0, lab1, lab2] = colors.map(c => c.lab());
        I = function (t) {
            const lab = ([
                0,
                1,
                2,
            ].map((i) => ((1 - t) * (1 - t) * lab0[i]) + (2 * (1 - t) * t * lab1[i]) + (t * t * lab2[i])));
            return new Color_1.default(lab, 'lab');
        };
    }
    else if (colors.length === 4) {
        // cubic bezier interpolation
        let lab3;
        [lab0, lab1, lab2, lab3] = colors.map(c => c.lab());
        I = function (t) {
            const lab = ([
                0,
                1,
                2,
            ].map((i) => ((1 - t) * (1 - t) * (1 - t) * lab0[i]) + (3 * (1 - t) * (1 - t) * t * lab1[i]) + (3 * (1 - t) * t * t * lab2[i]) + (t * t * t * lab3[i])));
            return new Color_1.default(lab, 'lab');
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
const bezier = (colors) => {
    const f = _bezier(colors);
    f.scale = () => scale_1.default(f);
    return f;
};
exports.default = bezier;
//# sourceMappingURL=bezier.js.map