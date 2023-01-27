function cssColors() {
  return [ "#906", "#66F", "#800", "#C60", "#EAEA00", "#006", "#360" ];
}

function cliColors() {
  return [ "cyan", "magenta", "blue", "yellow", "green", "red" ];
}

function loopColors(o, l) {
  var n, r;
  null !== (n = l) && void 0 !== n || (l = {}), o = o.slice();
  let t = 0;
  const e = o.length;
  let getIndex = (o, l) => t++ % e;
  if (l.rand) {
    const o = !0 === l.rand ? Math.random : l.rand, n = getIndex;
    getIndex = (l, r) => (t = Math.floor(r * o(l, r)), n(t, r));
  }
  let i = 0 | l.limit;
  i = i > 0 ? i : Infinity;
  const s = null !== (r = l.generator) && void 0 !== r ? r : (o, l) => o[l];
  return function*(l) {
    t = void 0 !== l ? (l |= 0) >= 0 ? l : t : 0;
    do {
      yield s(o, getIndex(t, e), t, e);
    } while (--i > 0);
  };
}

export { cliColors, cssColors, loopColors as default, loopColors };
//# sourceMappingURL=index.esm.mjs.map
