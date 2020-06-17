"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const num2rgb = (num) => {
    if (typeof num == "number" && num >= 0 && num <= 0xFFFFFF) {
        const r = num >> 16;
        const g = (num >> 8) & 0xFF;
        const b = num & 0xFF;
        return [r, g, b, 1];
    }
    throw new Error("unknown num color: " + num);
};
exports.default = num2rgb;
//# sourceMappingURL=num2rgb.js.map