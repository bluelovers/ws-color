// io --> convert colors

import chroma from './chroma';

export * from './types';
export { chroma }

// feel free to comment out anything to rollup
// a smaller chroma.js built

// io --> convert colors
import './io/css';
import './io/hex';
import './io/hsl';
import './io/lab';
import './io/rgb';

// operators --> modify existing Colors
import './ops/alpha';
import './ops/darken';
import './ops/get';
import './ops/mix';
import './ops/set';

// interpolators
import './interpolator/lrgb';

// generators -- > create new colors
import mix from './generator/mix';

// other utility methods
import valid from './utils/valid';

chroma.mix = chroma.interpolate = mix;

// other utility methods
chroma.valid = valid;

export default chroma;
