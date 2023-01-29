"use strict";

var n = require("@lazy-num/to-fixed-number");

function _handleOptions(n) {
  var r;
  return {
    randFn: null !== (r = null == n ? void 0 : n.randFn) && void 0 !== r ? r : Math.random
  };
}

function _randValue(n, r) {
  return _handleOptions(r).randFn() * n;
}

function _rgbRand(n, r) {
  var e;
  n = (null === (e = n) || void 0 === e ? void 0 : e.slice()) || [];
  for (let e = 0; e < 3; e++) {
    var a;
    n[e] = Math.round(_randValue(null !== (a = n[e]) && void 0 !== a ? a : 255, r));
  }
  return n;
}

Object.defineProperty(_rgbRand, "__esModule", {
  value: !0
}), Object.defineProperty(_rgbRand, "_rgbRand", {
  value: _rgbRand
}), Object.defineProperty(_rgbRand, "default", {
  value: _rgbRand
}), Object.defineProperty(_rgbRand, "_randAlpha", {
  value: function _randAlpha(r) {
    return n.toFixedNumber(_handleOptions(r).randFn(), 3);
  }
}), Object.defineProperty(_rgbRand, "_randValue", {
  value: _randValue
}), Object.defineProperty(_rgbRand, "_rgbObjectRand", {
  value: function _rgbObjectRand(n, r) {
    var e, a, d;
    let {r: t, g: u, b: l, a: o} = null != n ? n : {};
    return t = Math.round(_randValue(null !== (e = t) && void 0 !== e ? e : 255, r)), 
    u = Math.round(_randValue(null !== (a = u) && void 0 !== a ? a : 255, r)), l = Math.round(_randValue(null !== (d = l) && void 0 !== d ? d : 255, r)), 
    {
      r: t,
      g: u,
      b: l,
      a: o
    };
  }
}), Object.defineProperty(_rgbRand, "_rgbObjectToArray", {
  value: function _rgbObjectToArray(n) {
    const {r, g: e, b: a, a: d} = n;
    return [ r, e, a, d ];
  }
}), Object.defineProperty(_rgbRand, "_handleOptions", {
  value: _handleOptions
}), module.exports = _rgbRand;
//# sourceMappingURL=index.cjs.production.min.cjs.map
