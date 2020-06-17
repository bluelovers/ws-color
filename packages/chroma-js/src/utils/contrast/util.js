"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contrastFront = exports._contrast002 = exports._contrast001 = exports._contrast000 = void 0;
var EnumContrastFrontThreshold;
(function (EnumContrastFrontThreshold) {
    EnumContrastFrontThreshold[EnumContrastFrontThreshold["t01"] = 131.5] = "t01";
    EnumContrastFrontThreshold[EnumContrastFrontThreshold["t02"] = 120] = "t02";
})(EnumContrastFrontThreshold || (EnumContrastFrontThreshold = {}));
function _contrast000(rgba) {
    let [r, g, b] = rgba;
    return (((r * 299) + (g * 587) + (b * 144)) / 1000);
}
exports._contrast000 = _contrast000;
function _contrast001(rgba, threshold = 120 /* t02 */) {
    return _contrast000(rgba) >= threshold;
}
exports._contrast001 = _contrast001;
function _contrast002(rgba, threshold) {
    return _contrast001(rgba, threshold) ? 'black' : 'white';
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