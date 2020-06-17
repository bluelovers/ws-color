"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
exports.default = (col1, col2, f, m) => {
    let xyz0, xyz1;
    if (m === 'hsl') {
        xyz0 = col1.hsl();
        xyz1 = col2.hsl();
    }
    else if (m === 'hsv') {
        xyz0 = col1.hsv();
        xyz1 = col2.hsv();
    }
    else if (m === 'hcg') {
        xyz0 = col1.hcg();
        xyz1 = col2.hcg();
    }
    else if (m === 'hsi') {
        xyz0 = col1.hsi();
        xyz1 = col2.hsi();
    }
    else if (m === 'lch' || m === 'hcl') {
        m = 'hcl';
        xyz0 = col1.hcl();
        xyz1 = col2.hcl();
    }
    let hue0, hue1, sat0, sat1, lbv0, lbv1;
    if (m.substr(0, 1) === 'h') {
        [hue0, sat0, lbv0] = xyz0;
        [hue1, sat1, lbv1] = xyz1;
    }
    let sat, hue, lbv, dh;
    if (!isNaN(hue0) && !isNaN(hue1)) {
        // both colors have hue
        if (hue1 > hue0 && hue1 - hue0 > 180) {
            dh = hue1 - (hue0 + 360);
        }
        else if (hue1 < hue0 && hue0 - hue1 > 180) {
            dh = hue1 + 360 - hue0;
        }
        else {
            dh = hue1 - hue0;
        }
        hue = hue0 + f * dh;
    }
    else if (!isNaN(hue0)) {
        hue = hue0;
        if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv')
            sat = sat0;
    }
    else if (!isNaN(hue1)) {
        hue = hue1;
        if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv')
            sat = sat1;
    }
    else {
        hue = Number.NaN;
    }
    if (sat === undefined)
        sat = sat0 + f * (sat1 - sat0);
    lbv = lbv0 + f * (lbv1 - lbv0);
    return new Color_1.default([hue, sat, lbv], m);
};
//# sourceMappingURL=_hsx.js.map