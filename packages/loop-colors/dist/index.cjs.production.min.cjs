"use strict";

function loopColors(o, l) {
  var e;
  null != l || (l = {}), o = o.slice();
  let r = 0;
  const t = o.length;
  let getIndex = (o, l) => r++ % t;
  if (l.rand) {
    const o = !0 === l.rand ? Math.random : l.rand, e = getIndex;
    getIndex = (l, t) => (r = Math.floor(t * o(l, t)), e(r, t));
  }
  let n = 0 | l.limit;
  n = n > 0 ? n : Infinity;
  const s = null !== (e = l.generator) && void 0 !== e ? e : (o, l) => o[l];
  return function*(l) {
    r = void 0 !== l ? (l |= 0) >= 0 ? l : r : 0;
    do {
      yield s(o, getIndex(r, t), r, t);
    } while (--n > 0);
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cliColors = function cliColors() {
  return [ "cyan", "magenta", "blue", "yellow", "green", "red" ];
}, exports.cssColors = function cssColors() {
  return [ "#906", "#66F", "#800", "#C60", "#EAEA00", "#006", "#360" ];
}, exports.default = loopColors, exports.loopColors = loopColors;
//# sourceMappingURL=index.cjs.production.min.cjs.map
