'use strict';

var toFixedNumber = require('@lazy-num/to-fixed-number');

function _handleOptions(opts) {
  var _opts$randFn;
  return {
    randFn: (_opts$randFn = opts === null || opts === void 0 ? void 0 : opts.randFn) !== null && _opts$randFn !== void 0 ? _opts$randFn : Math.random
  };
}
function _randAlpha(opts) {
  return toFixedNumber.toFixedNumber(_handleOptions(opts).randFn(), 3);
}
function _randValue(base, opts) {
  return _handleOptions(opts).randFn() * base;
}
function _rgbRand(_rgba, opts) {
  var _rgba2;
  _rgba = ((_rgba2 = _rgba) === null || _rgba2 === void 0 ? void 0 : _rgba2.slice()) || [];
  for (let i = 0; i < 3; i++) {
    var _rgba$i;
    _rgba[i] = Math.round(_randValue((_rgba$i = _rgba[i]) !== null && _rgba$i !== void 0 ? _rgba$i : 255, opts));
  }
  return _rgba;
}
function _rgbObjectRand(_rgba, opts) {
  var _r, _g, _b;
  let {
    r,
    g,
    b,
    a
  } = _rgba !== null && _rgba !== void 0 ? _rgba : {};
  r = Math.round(_randValue((_r = r) !== null && _r !== void 0 ? _r : 255, opts));
  g = Math.round(_randValue((_g = g) !== null && _g !== void 0 ? _g : 255, opts));
  b = Math.round(_randValue((_b = b) !== null && _b !== void 0 ? _b : 255, opts));
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
  Object.defineProperty(_rgbRand, '_handleOptions', {
    value: _handleOptions
  });
}

// @ts-ignore
module.exports = _rgbRand;
//# sourceMappingURL=index.cjs.development.cjs.map
