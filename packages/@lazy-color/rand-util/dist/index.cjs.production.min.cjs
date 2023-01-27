"use strict";

var r = require("@lazy-num/to-fixed-number");

function _randValue(r) {
  return Math.random() * r;
}

function _rgbRand(r) {
  var e;
  r = (null === (e = r) || void 0 === e ? void 0 : e.slice()) || [];
  for (let e = 0; e < 3; e++) {
    var n;
    r[e] = Math.round(_randValue(null !== (n = r[e]) && void 0 !== n ? n : 255));
  }
  return r;
}

Object.defineProperty(_rgbRand, "__esModule", {
  value: !0
}), Object.defineProperty(_rgbRand, "_rgbRand", {
  value: _rgbRand
}), Object.defineProperty(_rgbRand, "default", {
  value: _rgbRand
}), Object.defineProperty(_rgbRand, "_randAlpha", {
  value: function _randAlpha() {
    return r.toFixedNumber(Math.random(), 3);
  }
}), Object.defineProperty(_rgbRand, "_randValue", {
  value: _randValue
}), Object.defineProperty(_rgbRand, "_rgbObjectRand", {
  value: function _rgbObjectRand(r) {
    var e, n, a;
    let {r: d, g: t, b: u, a: l} = r;
    return d = Math.round(_randValue(null !== (e = d) && void 0 !== e ? e : 255)), t = Math.round(_randValue(null !== (n = t) && void 0 !== n ? n : 255)), 
    u = Math.round(_randValue(null !== (a = u) && void 0 !== a ? a : 255)), {
      r: d,
      g: t,
      b: u,
      a: l
    };
  }
}), Object.defineProperty(_rgbRand, "_rgbObjectToArray", {
  value: function _rgbObjectToArray(r) {
    const {r: e, g: n, b: a, a: d} = r;
    return [ e, n, a, d ];
  }
}), module.exports = _rgbRand;
//# sourceMappingURL=index.cjs.production.min.cjs.map
