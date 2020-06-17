"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../io/lab");
const Color_1 = __importDefault(require("../Color"));
const lab_constants_1 = __importDefault(require("../io/lab/lab-constants"));
Color_1.default.prototype.darken = function (amount = 1) {
    const me = this;
    const lab = me.lab();
    lab[0] -= lab_constants_1.default.Kn * amount;
    return new Color_1.default(lab, 'lab').alpha(me.alpha(), true);
};
Color_1.default.prototype.brighten = function (amount = 1) {
    return this.darken(-amount);
};
Color_1.default.prototype.darker = Color_1.default.prototype.darken;
Color_1.default.prototype.brighter = Color_1.default.prototype.brighten;
//# sourceMappingURL=darken.js.map