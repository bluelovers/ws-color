"use strict";

var o = require("loop-colors"), e = require("colord"), r = require("@lazy-color/rand-util");

function createDefaultGenerator({cache: o}) {
  var a;
  return null !== (a = o) && void 0 !== a || (o = new Set), (a, t) => {
    let l = e.colord(a[t]);
    l.isValid() || (l = e.random());
    const d = l.toRgb();
    let n = 0, c = l;
    for (;o.has(c.toRgbString()); ) n > 5 && (o.clear(), n = 0), c = e.colord(r._rgbObjectRand(d)), 
    n++;
    return o.add(c.toRgbString()), c;
  };
}

function createColordRandLoop(e) {
  var r, a, t;
  let {colors: l, cache: d, ...n} = {
    ...e
  };
  return null !== (r = l) && void 0 !== r || (l = o.cssColors()), null !== (a = d) && void 0 !== a || (d = new Set), 
  null !== (t = n.generator) && void 0 !== t || (n.generator = createDefaultGenerator({
    cache: d
  })), o.loopColors(l, n);
}

function colordRandLoop(o, e) {
  return createColordRandLoop(e)(o);
}

Object.defineProperty(colordRandLoop, "__esModule", {
  value: !0
}), Object.defineProperty(colordRandLoop, "colordRandLoop", {
  value: colordRandLoop
}), Object.defineProperty(colordRandLoop, "default", {
  value: colordRandLoop
}), Object.defineProperty(colordRandLoop, "createDefaultGenerator", {
  value: createDefaultGenerator
}), Object.defineProperty(colordRandLoop, "createColordRandLoop", {
  value: createColordRandLoop
}), module.exports = colordRandLoop;
//# sourceMappingURL=index.cjs.production.min.cjs.map
