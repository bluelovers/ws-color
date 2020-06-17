"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitModeChannel(mc) {
    const [mode, channel] = mc.split('.');
    let index = -1;
    if (channel) {
        index = mode.indexOf(channel);
    }
    return [mode, channel, index];
}
exports.default = splitModeChannel;
//# sourceMappingURL=mode-channel-split.js.map