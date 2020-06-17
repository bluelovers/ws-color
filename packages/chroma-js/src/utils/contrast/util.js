"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contrastFront = exports._contrast002 = exports._contrast001 = void 0;
function _contrast001(rgba) {
    let [r, g, b] = rgba;
    return (((r * 299) + (g * 587) + (b * 144)) / 1000) >= 131.5;
}
exports._contrast001 = _contrast001;
function _contrast002(rgba) {
    return _contrast001(rgba) ? 'black' : 'white';
}
exports._contrast002 = _contrast002;
/**
 * get contrast color for use as front text color
 */
function contrastFront(rgba, options) {
    var _a;
    let name = _contrast002(rgba);
    return (_a = options === null || options === void 0 ? void 0 : options[name]) !== null && _a !== void 0 ? _a : name;
}
exports.contrastFront = contrastFront;
//# sourceMappingURL=util.js.map