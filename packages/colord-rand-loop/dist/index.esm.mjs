import { cssColors as o, loopColors as r } from "loop-colors";

import { colord as e, random as t } from "colord";

import { _rgbObjectRand as a } from "@lazy-color/rand-util";

function createDefaultGenerator({cache: o}) {
  var r;
  return null !== (r = o) && void 0 !== r || (o = new Set), (r, n) => {
    let l = e(r[n]);
    l.isValid() || (l = t());
    const c = l.toRgb();
    let d = 0, u = l;
    for (;o.has(u.toRgbString()); ) d > 5 && (o.clear(), d = 0), u = e(a(c)), d++;
    return o.add(u.toRgbString()), u;
  };
}

function createColordRandLoop(e) {
  var t, a, n;
  let {colors: l, cache: c, ...d} = {
    ...e
  };
  return null !== (t = l) && void 0 !== t || (l = o()), null !== (a = c) && void 0 !== a || (c = new Set), 
  null !== (n = d.generator) && void 0 !== n || (d.generator = createDefaultGenerator({
    cache: c
  })), r(l, d);
}

function colordRandLoop(o, r) {
  return createColordRandLoop(r)(o);
}

export { colordRandLoop, createColordRandLoop, createDefaultGenerator, colordRandLoop as default };
//# sourceMappingURL=index.esm.mjs.map
