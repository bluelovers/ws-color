function cssColors() {
  return [ "#906", "#66F", "#800", "#C60", "#EAEA00", "#006", "#360" ];
}

function cliColors() {
  return [ "cyan", "magenta", "blue", "yellow", "green", "red" ];
}

function loopColors(o, l) {
  o = o.slice();
  let n = 0;
  const r = o.length;
  let getIndex = (o, l) => n++ % r;
  if (null != l && l.rand) {
    const o = !0 === l.rand ? Math.random : l.rand, r = getIndex;
    getIndex = (l, t) => (n = Math.floor(n * o(l, t)), r(l, t));
  }
  let t = 0 | (null == l ? void 0 : l.limit);
  return t = t > 0 ? t : Infinity, function*(l) {
    n = void 0 !== l ? (l |= 0) >= 0 ? l : n : 0;
    do {
      yield o[getIndex(n, r)];
    } while (--t > 0);
  };
}

export { cliColors, cssColors, loopColors as default, loopColors };
//# sourceMappingURL=index.esm.mjs.map
