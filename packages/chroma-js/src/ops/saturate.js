"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/lch");
const Color_1 = __importDefault(require("../Color"));
const lab_constants_1 = __importDefault(require("../io/lab/lab-constants"));
Color_1.default.prototype.saturate = function (amount = 1) {
    const me = this;
    const lch = me.lch();
    lch[1] += lab_constants_1.default.Kn * amount;
    if (lch[1] < 0)
        lch[1] = 0;
    return new Color_1.default(lch, 'lch').alpha(me.alpha(), true);
};
Color_1.default.prototype.desaturate = function (amount = 1) {
    return this.saturate(-amount);
};
//# sourceMappingURL=saturate.js.map