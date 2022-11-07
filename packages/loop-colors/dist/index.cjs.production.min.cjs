"use strict";

function loopColors(o, l) {
  o = o.slice();
  let e = 0;
  const r = o.length;
  let getIndex = (o, l) => e++ % r;
  if (null != l && l.rand) {
    const o = !0 === l.rand ? Math.random : l.rand, r = getIndex;
    getIndex = (l, t) => (e = Math.floor(e * o(l, t)), r(l, t));
  }
  let t = 0 | (null == l ? void 0 : l.limit);
  return t = t > 0 ? t : Infinity, function*(l) {
    e = void 0 !== l ? (l |= 0) >= 0 ? l : e : 0;
    do {
      yield o[getIndex(e, r)];
    } while (--t > 0);
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
