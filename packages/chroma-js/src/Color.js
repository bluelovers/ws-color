"use strict";
//import { last, clip_rgb, type } from './utils';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Color = void 0;
const type_1 = __importDefault(require("./utils/type"));
const colors_1 = __importDefault(require("./colors"));
const autodetect_1 = __importStar(require("./utils/autodetect"));
class Color {
    constructor(...args) {
        const me = this;
        if (args.length === 0) {
            this._rgb = colors_1.default._empty.slice();
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
        let ret = autodetect_1.default(args);
        autodetect_1.assertAutodetectReturn(ret);
        me._rgb = ret._rgb;
    }
    get [0]() {
        return this._rgb[0];
    }
    get [1]() {
        return this._rgb[1];
    }
    get [2]() {
        return this._rgb[2];
    }
    get [3]() {
        return this._rgb[3];
    }
    get length() {
        return this._rgb.length;
    }
    *[Symbol.iterator]() {
        for (let i = 0; i < this._rgb.length; i++) {
            yield this._rgb[i];
        }
    }
    get _rgba() {
        return this._rgb;
    }
    set _rgba(value) {
        this._rgb = value;
    }
    toString() {
        // @ts-ignore
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