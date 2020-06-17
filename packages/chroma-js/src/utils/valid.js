"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
function valid(...args) {
    try {
        new Color_1.default(...args);
        return true;
    }
    catch (e) {
        return false;
    }
}
;
exports.default = valid;
//# sourceMappingURL=valid.js.map