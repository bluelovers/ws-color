import { toFixedNumber as r } from "@lazy-num/to-fixed-number";

function _randAlpha() {
  return r(Math.random(), 3);
}

function _randValue(r) {
  return Math.random() * r;
}

function _rgbRand(r) {
  var n;
  r = (null === (n = r) || void 0 === n ? void 0 : n.slice()) || [];
  for (let n = 0; n < 3; n++) {
    var a;
    r[n] = Math.round(_randValue(null !== (a = r[n]) && void 0 !== a ? a : 255));
  }
  return r;
}

function _rgbObjectRand(r) {
  var n, a, u;
  let {r: d, g: t, b: o, a: l} = r;
  return d = Math.round(_randValue(null !== (n = d) && void 0 !== n ? n : 255)), t = Math.round(_randValue(null !== (a = t) && void 0 !== a ? a : 255)), 
  o = Math.round(_randValue(null !== (u = o) && void 0 !== u ? u : 255)), {
    r: d,
    g: t,
    b: o,
    a: l
  };
}

function _rgbObjectToArray(r) {
  const {r: n, g: a, b: u, a: d} = r;
  return [ n, a, u, d ];
}

export { _randAlpha, _randValue, _rgbObjectRand, _rgbObjectToArray, _rgbRand, _rgbRand as default };
//# sourceMappingURL=index.esm.mjs.map
