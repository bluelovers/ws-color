"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const lodash_1 = require("lodash");
const w3cx11_1 = require("@bluelovers/color-palette/lib/w3cx11");
lodash_1.defaults(index_1.default, w3cx11_1.w3cx11);
exports.default = w3cx11_1.w3cx11;
//# sourceMappingURL=w3cx11.js.map