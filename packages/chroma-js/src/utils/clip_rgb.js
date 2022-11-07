"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const limit_1 = __importDefault(require("./limit"));
exports.default = (rgb) => {
    rgb._clipped = false;
    rgb._unclipped = rgb.slice(0);
    for (let i = 0; i <= 3; i++) {
        if (i < 3) {
            if (rgb[i] < 0 || rgb[i] > 255)
                rgb._clipped = true;
            rgb[i] = (0, limit_1.default)(rgb[i], 0, 255);
        }
        else if (i === 3) {
            rgb[i] = (0, limit_1.default)(rgb[i], 0, 1);
        }
    }
    return rgb;
};
//# sourceMappingURL=clip_rgb.js.map