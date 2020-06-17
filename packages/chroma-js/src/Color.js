"use strict";
//import { last, clip_rgb, type } from './utils';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const clip_rgb_1 = __importDefault(require("./utils/clip_rgb"));
const last_1 = __importDefault(require("./utils/last"));
const type_1 = __importDefault(require("./utils/type"));
const input_1 = __importDefault(require("./io/input"));
class Color {
    constructor(...args) {
        const me = this;
        if (args.length === 0) {
            this._rgb = [null, null, null, null];
            return this;
        }
        if (type_1.default(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }
        if (args[0] instanceof Color) {
            return args[0].clone();
        }
        // last argument could be the mode
        let mode = last_1.default(args);
        let autodetect = false;
        if (!mode) {
            autodetect = true;
            if (!input_1.default.sorted) {
                input_1.default.autodetect = input_1.default.autodetect.sort((a, b) => b.p - a.p);
                input_1.default.sorted = true;
            }
            // auto-detect format
            for (let chk of input_1.default.autodetect) {
                mode = chk.test(...args);
                if (mode)
                    break;
            }
        }
        if (input_1.default.format[mode]) {
            const rgb = input_1.default.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
            me._rgb = clip_rgb_1.default(rgb);
        }
        else {
            console.dir(input_1.default.format);
            throw new Error('unknown format: ' + args);
        }
        // add alpha channel
        if (me._rgb.length === 3)
            me._rgb.push(1);
    }
    get _rgba() {
        return this._rgb;
    }
    set _rgba(value) {
        this._rgb = value;
    }
    toString() {
        if (typeof this.hex === 'function')
            return this.hex();
        return `[${this._rgb.join(',')}]`;
    }
    clone() {
        return new Color(this._rgb.slice());
    }
}
exports.Color = Color;
exports.default = Color;
//# sourceMappingURL=Color.js.map