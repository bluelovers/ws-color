"use strict";
// cubehelix interpolation
// based on D.A. Green "A colour scheme for the display of astronomical intensity images"
// http://astron-soc.in/bulletin/11June/289392011.pdf
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chroma_1 = __importDefault(require("../chroma"));
const utils_1 = require("../utils");
const clip_rgb_1 = __importDefault(require("../utils/clip_rgb"));
const { pow, sin, cos } = Math;
function cubehelix(start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0, 1]) {
    let dh = 0, dl;
    if (Array.isArray(lightness)) {
        dl = lightness[1] - lightness[0];
    }
    else {
        dl = 0;
        lightness = [lightness, lightness];
    }
    const f = function (fract) {
        const a = utils_1.TWOPI * (((start + 120) / 360) + (rotations * fract));
        const l = pow(lightness[0] + (dl * fract), gamma);
        const h = dh !== 0 ? hue[0] + (fract * dh) : hue;
        const amp = (h * l * (1 - l)) / 2;
        const cos_a = cos(a);
        const sin_a = sin(a);
        const r = l + (amp * ((-0.14861 * cos_a) + (1.78277 * sin_a)));
        const g = l + (amp * ((-0.29227 * cos_a) - (0.90649 * sin_a)));
        const b = l + (amp * (+1.97294 * cos_a));
        return chroma_1.default(clip_rgb_1.default([r * 255, g * 255, b * 255, 1]));
    };
    // @ts-ignore
    f.start = function (n) {
        if (typeof n === 'number') {
            start = n;
            return f;
        }
        return start;
    };
    // @ts-ignore
    f.rotations = function (n) {
        if (typeof n === 'number') {
            rotations = n;
            return f;
        }
        return rotations;
    };
    // @ts-ignore
    f.gamma = function (n) {
        if (typeof n === 'number') {
            gamma = n;
            return f;
        }
        return gamma;
    };
    // @ts-ignore
    f.hue = function (h) {
        if (Array.isArray(h)) {
            hue = h;
            dh = hue[1] - hue[0];
            if (dh === 0) {
                hue = hue[1];
            }
        }
        else if (typeof hue === "number") {
            hue = h;
            dh = 0;
        }
        else {
            return hue;
        }
        return f;
    };
    // @ts-ignore
    f.lightness = function (h) {
        if ((h == null)) {
            return lightness;
        }
        if (Array.isArray(h)) {
            lightness = h;
            dl = h[1] - h[0];
        }
        else {
            lightness = [h, h];
            dl = 0;
        }
        return f;
    };
    f.scale = () => chroma_1.default.scale(f);
    f.hue(hue);
    return f;
}
;
exports.default = cubehelix;
//# sourceMappingURL=cubehelix.js.map