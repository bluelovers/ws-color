"use strict";
/**
 * Created by user on 2020/6/17.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.named2rgb = exports.hex2name = exports._named2rgb = void 0;
const index_1 = __importDefault(require("../../colors/index"));
require("../../colors/w3cx11");
const hex2rgb_1 = __importDefault(require("../hex/hex2rgb"));
const rgb2hex_1 = __importDefault(require("../hex/rgb2hex"));
function _named2rgb(name) {
    let value = index_1.default[name.toLowerCase()];
    if (value === null || value === void 0 ? void 0 : value.length) {
        if (typeof value === 'string') {
            return hex2rgb_1.default(value);
        }
        else if (Array.isArray(value) && value.length === 4) {
            return value.slice();
        }
    }
}
exports._named2rgb = _named2rgb;
function hex2name(hex) {
    for (let name in index_1.default) {
        let value = index_1.default[name];
        if (typeof value !== 'string') {
            value = rgb2hex_1.default(value);
        }
        if (value === hex) {
            return name;
        }
    }
}
exports.hex2name = hex2name;
function named2rgb(name) {
    let value = _named2rgb(name);
    if (value === null || value === void 0 ? void 0 : value.length) {
        return value;
    }
    throw new Error('unknown color name: ' + name);
}
exports.named2rgb = named2rgb;
exports.default = named2rgb;
//# sourceMappingURL=named2rgb.js.map