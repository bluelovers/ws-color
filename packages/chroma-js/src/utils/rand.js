"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function rand(rgba, options) {
    var _a, _b, _c, _d;
    rgba = (_b = (_a = rgba === null || rgba === void 0 ? void 0 : rgba.slice) === null || _a === void 0 ? void 0 : _a.call(rgba)) !== null && _b !== void 0 ? _b : [];
    let { fn = Math.random, includeAlpha } = options !== null && options !== void 0 ? options : {};
    let i;
    for (i = 0; i < 3; i++) {
        let value = (_c = rgba[i]) !== null && _c !== void 0 ? _c : 255;
        value |= 0;
        rgba[i] = fn(i, value, rgba) * (1 + value);
    }
    rgba[3] = (_d = rgba[3]) !== null && _d !== void 0 ? _d : 1;
    if (includeAlpha) {
        let value = isNaN(rgba[3]) ? 1 : rgba[3];
        value = fn(i, value, rgba) * value;
        rgba[3] = Math.max(Math.min(value, 255), 0);
    }
    return rgba;
}
exports.default = rand;
//# sourceMappingURL=rand.js.map