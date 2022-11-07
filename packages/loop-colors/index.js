"use strict";
/**
 * Created by user on 2020/6/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loopColors = exports.cliColors = exports.cssColors = void 0;
function cssColors() {
    return [
        '#906',
        '#66F',
        '#800',
        '#C60',
        '#EAEA00',
        '#006',
        '#360',
    ];
}
exports.cssColors = cssColors;
function cliColors() {
    return ["cyan", "magenta", "blue", "yellow", "green", "red"];
}
exports.cliColors = cliColors;
function loopColors(colors, options) {
    colors = colors.slice();
    let idx = 0;
    const len = colors.length;
    let getIndex = (index, length) => idx++ % len;
    if (options === null || options === void 0 ? void 0 : options.rand) {
        const rand = options.rand === true ? Math.random : options.rand;
        const _ = getIndex;
        getIndex = (index, length) => {
            idx = Math.floor(idx * rand(index, length));
            return _(index, length);
        };
    }
    let limit = (options === null || options === void 0 ? void 0 : options.limit) | 0;
    limit = limit > 0 ? limit : Infinity;
    return function* (startIndex) {
        if (typeof startIndex !== 'undefined') {
            startIndex |= 0;
            idx = startIndex >= 0 ? startIndex : idx;
        }
        else {
            idx = 0;
        }
        do {
            yield colors[getIndex(idx, len)];
        } while (--limit > 0);
    };
}
exports.loopColors = loopColors;
exports.default = loopColors;
//# sourceMappingURL=index.js.map