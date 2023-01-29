import { cssColors as o, loopColors as r } from "loop-colors";

import { colord as e, random as t } from "colord";

import { _rgbObjectRand as n } from "@lazy-color/rand-util";

function createDefaultGenerator({cache: o, ...r}) {
  var a;
  return null !== (a = o) && void 0 !== a || (o = new Set), (a, l) => {
    let c = e(a[l]);
    c.isValid() || (c = "function" == typeof r.randFn ? e(n(null, r)) : t());
    const d = c.toRgb();
    let u = 0, i = c;
    for (;o.has(i.toRgbString()); ) u > 5 && (o.clear(), u = 0), i = e(n(d, r)), u++;
    return o.add(i.toRgbString()), i;
  };
}

function createColordRandLoop(e) {
  var t, n, a;
  let {colors: l, cache: c, ...d} = {
    ...e
  };
  return null !== (t = l) && void 0 !== t || (l = o()), null !== (n = c) && void 0 !== n || (c = new Set), 
  null !== (a = d.generator) && void 0 !== a || (d.generator = createDefaultGenerator({
    cache: c
  })), r(l, d);
}

function colordRandLoop(o, r) {
  return createColordRandLoop(r)(o);
}

export { colordRandLoop, createColordRandLoop, createDefaultGenerator, colordRandLoop as default };
//# sourceMappingURL=index.esm.mjs.map
