"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = __importDefault(require("../Color"));
const mode_channel_split_1 = __importDefault(require("../utils/mode-channel-split"));
// @ts-ignore
Color_1.default.prototype.get = function (mc) {
    const [mode, channel, i] = mode_channel_split_1.default(mc);
    const src = this[mode]();
    if (channel) {
        if (i > -1)
            return src[i];
        throw new Error(`unknown channel ${channel} in mode ${mode}`);
    }
    else {
        return src;
    }
};
//# sourceMappingURL=get.js.map