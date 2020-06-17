"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = __importDefault(require("./type"));
exports.default = (args, keyOrder) => {
    // if called with more than 3 arguments, we return the arguments
    if (args.length >= 3)
        return Array.prototype.slice.call(args);
    // with less than 3 args we check if first arg is object
    // and use the keyOrder string to extract and sort properties
    if (type_1.default(args[0]) == 'object' && keyOrder) {
        return keyOrder.split('')
            .filter(k => args[0][k] !== undefined)
            .map(k => args[0][k]);
    }
    // otherwise we just return the first argument
    // (which we suppose is an array of args)
    return args[0];
};
//# sourceMappingURL=unpack.js.map