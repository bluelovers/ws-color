"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeofTarget = void 0;
// ported from jQuery's $.type
const classToType = {};
for (let name of ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']) {
    classToType[`[object ${name}]`] = name.toLowerCase();
}
/**
 * @deprecated
 */
function typeofTarget(obj) {
    return classToType[Object.prototype.toString.call(obj)] || "object";
}
exports.typeofTarget = typeofTarget;
exports.default = typeofTarget;
//# sourceMappingURL=type.js.map