"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const mode_channel_split_1 = __importDefault(require("../utils/mode-channel-split"));
// @ts-ignore
Color_1.default.prototype.set = function (mc, value, mutate = false) {
    const [mode, channel, i] = (0, mode_channel_split_1.default)(mc);
    const src = this[mode]();
    if (channel) {
        if (i > -1) {
            if (typeof value === 'string') {
                switch (value.charAt(0)) {
                    case '+':
                        src[i] += +value;
                        break;
                    case '-':
                        src[i] += +value;
                        break;
                    case '*':
                        src[i] *= +(value.substr(1));
                        break;
                    case '/':
                        src[i] /= +(value.substr(1));
                        break;
                    default:
                        src[i] = +value;
                }
            }
            else if (typeof value === 'number') {
                src[i] = value;
            }
            else {
                throw new Error(`unsupported value for Color.set`);
            }
            const out = new Color_1.default(src, mode);
            if (mutate) {
                this._rgb = out._rgb;
                return this;
            }
            return out;
        }
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    }
    else {
        return src;
    }
};
//# sourceMappingURL=set.js.map