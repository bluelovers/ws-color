"use strict";

var o = require("loop-colors"), e = require("colord"), r = require("@lazy-color/rand-util");

function createDefaultGenerator({cache: o, ...t}) {
  var a;
  return null !== (a = o) && void 0 !== a || (o = new Set), (a, l) => {
    let n = e.colord(a[l]);
    n.isValid() || (n = "function" == typeof t.randFn ? e.colord(r._rgbObjectRand(null, t)) : e.random());
    const d = n.toRgb();
    let c = 0, u = n;
    for (;o.has(u.toRgbString()); ) c > 5 && (o.clear(), c = 0), u = e.colord(r._rgbObjectRand(d, t)), 
    c++;
    return o.add(u.toRgbString()), u;
  };
}

function createColordRandLoop(e) {
  var r, t, a;
  let {colors: l, cache: n, ...d} = {
    ...e
  };
  return null !== (r = l) && void 0 !== r || (l = o.cssColors()), null !== (t = n) && void 0 !== t || (n = new Set), 
  null !== (a = d.generator) && void 0 !== a || (d.generator = createDefaultGenerator({
    cache: n
  })), o.loopColors(l, d);
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
