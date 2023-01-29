import { toFixedNumber as n } from "@lazy-num/to-fixed-number";

function _handleOptions(n) {
  var r;
  return {
    randFn: null !== (r = null == n ? void 0 : n.randFn) && void 0 !== r ? r : Math.random
  };
}

function _randAlpha(r) {
  return n(_handleOptions(r).randFn(), 3);
}

function _randValue(n, r) {
  return _handleOptions(r).randFn() * n;
}

function _rgbRand(n, r) {
  var a;
  n = (null === (a = n) || void 0 === a ? void 0 : a.slice()) || [];
  for (let a = 0; a < 3; a++) {
    var d;
    n[a] = Math.round(_randValue(null !== (d = n[a]) && void 0 !== d ? d : 255, r));
  }
  return n;
}

function _rgbObjectRand(n, r) {
  var a, d, t;
  let {r: u, g: l, b: o, a: e} = n;
  return u = Math.round(_randValue(null !== (a = u) && void 0 !== a ? a : 255, r)), 
  l = Math.round(_randValue(null !== (d = l) && void 0 !== d ? d : 255, r)), o = Math.round(_randValue(null !== (t = o) && void 0 !== t ? t : 255, r)), 
  {
    r: u,
    g: l,
    b: o,
    a: e
  };
}

function _rgbObjectToArray(n) {
  const {r, g: a, b: d, a: t} = n;
  return [ r, a, d, t ];
}

export { _handleOptions, _randAlpha, _randValue, _rgbObjectRand, _rgbObjectToArray, _rgbRand, _rgbRand as default };
//# sourceMappingURL=index.esm.mjs.map
