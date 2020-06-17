"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHex = exports._randomHex = exports.rand = exports._handleOptions = void 0;
const digits = '0123456789abcdef';
function _handleOptions(options) {
    let { fn = Math.random, includeAlpha } = options !== null && options !== void 0 ? options : {};
    return {
        ...options,
        fn,
        includeAlpha,
    };
}
exports._handleOptions = _handleOptions;
function rand(options) {
    var _a, _b, _c, _d;
    let { rgba, fn, includeAlpha, round } = _handleOptions(options);
    rgba = (_b = (_a = rgba === null || rgba === void 0 ? void 0 : rgba.slice) === null || _a === void 0 ? void 0 : _a.call(rgba)) !== null && _b !== void 0 ? _b : [];
    let i;
    for (i = 0; i < 3; i++) {
        let value = (_c = rgba[i]) !== null && _c !== void 0 ? _c : 255;
        value |= 0;
        value = fn(i, value, rgba) * (1 + value);
        if (round === true) {
            value = Math.round(value);
        }
        rgba[i] = value;
    }
    rgba[3] = (_d = rgba[3]) !== null && _d !== void 0 ? _d : 1;
    if (includeAlpha) {
        let value = isNaN(rgba[3]) ? 1 : rgba[3];
        value = fn(i, value, rgba) * value;
        rgba[3] = Math.max(Math.min(value, 255), 0);
    }
    return rgba;
}
exports.rand = rand;
function _randomHex(options) {
    let { fn, includeAlpha, length } = _handleOptions(options);
    length = length > 0 ? length : (includeAlpha ? 8 : 6);
    let ls = [];
    for (let i = 0; i < length; i++) {
        let code = digits.charAt(Math.floor(fn(i) * 16));
        ls.push(code);
    }
    return ls.join('');
}
exports._randomHex = _randomHex;
function randomHex(options) {
    options === null || options === void 0 ? true : delete options.length;
    return _randomHex(options);
}
exports.randomHex = randomHex;
exports.default = rand;
//# sourceMappingURL=rand.js.map