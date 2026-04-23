import { cssColors as o, loopColors as r } from "loop-colors";

import { colord as e, random as t } from "colord";

import { _rgbObjectRand as n } from "@lazy-color/rand-util";

function createDefaultGenerator({cache: o, ...r}) {
  return null != o || (o = new Set), (a, l) => {
    let c = e(a[l]);
    c.isValid() || (c = "function" == typeof r.randFn ? e(n(null, r)) : t());
    const d = c.toRgb();
    let u = 0, f = c;
    for (;o.has(f.toRgbString()); ) u > 5 && (o.clear(), u = 0), f = e(n(d, r)), u++;
    return o.add(f.toRgbString()), f;
  };
}

function createColordRandLoop(e) {
  var t;
  let {colors: n, cache: a, ...l} = {
    ...e
  };
  return null != n || (n = o()), null != a || (a = new Set), null !== (t = l.generator) && void 0 !== t || (l.generator = createDefaultGenerator({
    cache: a
  })), r(n, l);
}

function colordRandLoop(o, r) {
  return createColordRandLoop(r)(o);
}

export { colordRandLoop, createColordRandLoop, createDefaultGenerator, colordRandLoop as default };
//# sourceMappingURL=index.esm.mjs.map
