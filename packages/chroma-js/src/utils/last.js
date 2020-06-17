"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (args) => {
    if (args.length < 2)
        return null;
    const l = args.length - 1;
    if (typeof args[l] === 'string')
        return args[l].toLowerCase();
    return null;
};
//# sourceMappingURL=last.js.map