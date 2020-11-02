"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertAutodetectReturn = exports.autodetect = void 0;
const last_1 = __importDefault(require("./last"));
const input_1 = __importDefault(require("../io/input"));
const clip_rgb_1 = __importDefault(require("./clip_rgb"));
function autodetect(args) {
    let _rgb;
    // last argument could be the mode
    let mode = last_1.default(args);
    let autodetect = false;
    if (!(mode === null || mode === void 0 ? void 0 : mode.length)) {
        if (input_1.default.sorted !== true) {
            input_1.default.autodetect = input_1.default.autodetect.sort((a, b) => b.p - a.p);
            //array_unique_overwrite(_input.autodetect);
            input_1.default.sorted = true;
        }
        // auto-detect format
        for (let chk of input_1.default.autodetect) {
            let m = chk.test(...args);
            if (typeof m !== 'undefined') {
                autodetect = true;
                mode = m;
                break;
            }
        }
    }
    if (input_1.default.format[mode]) {
        // @ts-ignore
        const rgb = input_1.default.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
        _rgb = clip_rgb_1.default(rgb);
        // add alpha channel
        if (_rgb.length === 3)
            _rgb.push(1);
    }
    else {
        throw new Error(`unknown format: ${args}, mode: ${mode}, autodetect: ${autodetect}`);
    }
    return {
        args,
        _rgb,
        mode,
        autodetect,
    };
}
exports.autodetect = autodetect;
function assertAutodetectReturn(ret) {
    if (!ret._rgb) {
        throw new TypeError(`unknown format: ${ret.args}, mode: ${ret.mode}, autodetect: ${ret.autodetect}, _rgb: ${ret._rgb}`);
    }
}
exports.assertAutodetectReturn = assertAutodetectReturn;
exports.default = autodetect;
//# sourceMappingURL=autodetect.js.map