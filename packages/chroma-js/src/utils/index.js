"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAD2DEG = exports.DEG2RAD = exports.PITHIRD = exports.TWOPI = exports.PI = exports.last = exports.unpack = exports.type = exports.limit = exports.clip_rgb = void 0;
const type_1 = __importDefault(require("./type"));
exports.type = type_1.default;
const limit_1 = __importDefault(require("./limit"));
exports.limit = limit_1.default;
const clip_rgb_1 = __importDefault(require("./clip_rgb"));
exports.clip_rgb = clip_rgb_1.default;
const unpack_1 = __importDefault(require("./unpack"));
exports.unpack = unpack_1.default;
const last_1 = __importDefault(require("./last"));
exports.last = last_1.default;
exports.PI = Math.PI;
exports.TWOPI = exports.PI * 2;
exports.PITHIRD = exports.PI / 3;
exports.DEG2RAD = exports.PI / 180;
exports.RAD2DEG = 180 / exports.PI;
exports.default = {
    clip_rgb: clip_rgb_1.default,
    limit: limit_1.default,
    type: type_1.default,
    unpack: unpack_1.default,
    last: last_1.default,
    PI: exports.PI,
    TWOPI: exports.TWOPI,
    PITHIRD: exports.PITHIRD,
    DEG2RAD: exports.DEG2RAD,
    RAD2DEG: exports.RAD2DEG,
};
//# sourceMappingURL=index.js.map