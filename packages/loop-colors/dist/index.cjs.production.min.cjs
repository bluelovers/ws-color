"use strict";

function loopColors(o, l) {
  var e, r;
  null !== (e = l) && void 0 !== e || (l = {}), o = o.slice();
  let t = 0;
  const n = o.length;
  let getIndex = (o, l) => t++ % n;
  if (l.rand) {
    const o = !0 === l.rand ? Math.random : l.rand, e = getIndex;
    getIndex = (l, r) => (t = Math.floor(t * o(l, r)), e(l, r));
  }
  let s = 0 | l.limit;
  s = s > 0 ? s : Infinity;
  const i = null !== (r = l.generator) && void 0 !== r ? r : (o, l) => o[l];
  return function*(l) {
    t = void 0 !== l ? (l |= 0) >= 0 ? l : t : 0;
    do {
      yield i(o, getIndex(t, n), t, n);
    } while (--s > 0);
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
