"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limit = void 0;
function limit(x, min = 0, max = 1) {
    return x < min ? min : x > max ? max : x;
}
exports.limit = limit;
exports.default = limit;
//# sourceMappingURL=limit.js.map