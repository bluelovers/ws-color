"use strict";

var o = require("loop-colors"), e = require("colord"), r = require("@lazy-color/rand-util");

function createDefaultGenerator({cache: o, ...t}) {
  return null != o || (o = new Set), (l, a) => {
    let n = e.colord(l[a]);
    n.isValid() || (n = "function" == typeof t.randFn ? e.colord(r._rgbObjectRand(null, t)) : e.random());
    const d = n.toRgb();
    let c = 0, u = n;
    for (;o.has(u.toRgbString()); ) c > 5 && (o.clear(), c = 0), u = e.colord(r._rgbObjectRand(d, t)), 
    c++;
    return o.add(u.toRgbString()), u;
  };
}

function createColordRandLoop(e) {
  var r;
  let {colors: t, cache: l, ...a} = {
    ...e
  };
  return null != t || (t = o.cssColors()), null != l || (l = new Set), null !== (r = a.generator) && void 0 !== r || (a.generator = createDefaultGenerator({
    cache: l
  })), o.loopColors(t, a);
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
