'use strict';

var toFixedNumber = require('@lazy-num/to-fixed-number');

function _randAlpha() {
  return toFixedNumber.toFixedNumber(Math.random(), 3);
}
function _randValue(base) {
  return Math.random() * base;
}
function _rgbRand(_rgba) {
  var _rgba2;
  _rgba = ((_rgba2 = _rgba) === null || _rgba2 === void 0 ? void 0 : _rgba2.slice()) || [];
  for (let i = 0; i < 3; i++) {
    var _rgba$i;
    _rgba[i] = Math.round(_randValue((_rgba$i = _rgba[i]) !== null && _rgba$i !== void 0 ? _rgba$i : 255));
  }
  return _rgba;
}
function _rgbObjectRand(_rgba) {
  var _r, _g, _b;
  let {
    r,
    g,
    b,
    a
  } = _rgba;
  r = Math.round(_randValue((_r = r) !== null && _r !== void 0 ? _r : 255));
  g = Math.round(_randValue((_g = g) !== null && _g !== void 0 ? _g : 255));
  b = Math.round(_randValue((_b = b) !== null && _b !== void 0 ? _b : 255));
  return {
    r,
    g,
    b,
    a
  };
}
function _rgbObjectToArray(_rgba) {
  const {
    r,
    g,
    b,
    a
  } = _rgba;
  return [r, g, b, a];
}
{
  Object.defineProperty(_rgbRand, "__esModule", {
    value: true
  });
  Object.defineProperty(_rgbRand, '_rgbRand', {
    value: _rgbRand
  });
  Object.defineProperty(_rgbRand, 'default', {
    value: _rgbRand
  });
  Object.defineProperty(_rgbRand, '_randAlpha', {
    value: _randAlpha
  });
  Object.defineProperty(_rgbRand, '_randValue', {
    value: _randValue
  });
  Object.defineProperty(_rgbRand, '_rgbObjectRand', {
    value: _rgbObjectRand
  });
  Object.defineProperty(_rgbRand, '_rgbObjectToArray', {
    value: _rgbObjectToArray
  });
}

// @ts-ignore
module.exports = _rgbRand;
//# sourceMappingURL=index.cjs.development.cjs.map
