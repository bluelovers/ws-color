function cssColors() {
  return [ "#906", "#66F", "#800", "#C60", "#EAEA00", "#006", "#360" ];
}

function cliColors() {
  return [ "cyan", "magenta", "blue", "yellow", "green", "red" ];
}

function loopColors(o, l) {
  var n;
  null != l || (l = {}), o = o.slice();
  let r = 0;
  const t = o.length;
  let getIndex = (o, l) => r++ % t;
  if (l.rand) {
    const o = !0 === l.rand ? Math.random : l.rand, n = getIndex;
    getIndex = (l, t) => (r = Math.floor(t * o(l, t)), n(r, t));
  }
  let e = 0 | l.limit;
  e = e > 0 ? e : Infinity;
  const i = null !== (n = l.generator) && void 0 !== n ? n : (o, l) => o[l];
  return function*(l) {
    r = void 0 !== l ? (l |= 0) >= 0 ? l : r : 0;
    do {
      yield i(o, getIndex(r, t), r, t);
    } while (--e > 0);
  };
}

export { cliColors, cssColors, loopColors as default, loopColors };
//# sourceMappingURL=index.esm.mjs.map
