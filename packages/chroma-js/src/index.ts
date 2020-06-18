// io --> convert colors

import chroma from './chroma';

export * from './types';
export { chroma }

import './colors/w3cx11';
import colorbrewer from './colors/colorbrewer';

chroma.brewer = colorbrewer;

// feel free to comment out anything to rollup
// a smaller chroma.js built
import './io/cmyk';
import './io/css';
import './io/gl';
import './io/hcg';
import './io/hex';
import './io/hsi';
import './io/hsl';
import './io/hsv';
import './io/lab';
import './io/lch';
import './io/named';
import './io/num';
import './io/rgb';
import './io/temp';

// operators --> modify existing Colors
import './ops/alpha';
import './ops/clipped';
import './ops/darken';
import './ops/get';
import './ops/luminance';
import './ops/mix';
import './ops/premultiply';
import './ops/saturate';
import './ops/set';
import './ops/rand';
import './ops/contrast';

// interpolators
import './interpolator/rgb';
import './interpolator/lrgb';
import './interpolator/lab';
import './interpolator/lch';
import './interpolator/num';
import './interpolator/hcg';
import './interpolator/hsi';
import './interpolator/hsl';
import './interpolator/hsv';

// generators -- > create new colors
import average from './generator/average';
import bezier from './generator/bezier';
import blend from './generator/blend';
import cubehelix from './generator/cubehelix';
import mix from './generator/mix';
import './generator/random';
import scale from './generator/scale';

// other utility methods
import { analyze, limits } from './utils/analyze';
import contrast from './utils/contrast';
import deltaE from './utils/delta-e';
import distance from './utils/distance';
import valid from './utils/valid';
import scales from './utils/scales';


chroma.average = average;
chroma.bezier = bezier;
chroma.blend = blend;
chroma.cubehelix = cubehelix;
chroma.mix = chroma.interpolate = mix;

chroma.scale = scale;

// other utility methods
chroma.analyze = analyze;
chroma.contrast = contrast;
chroma.deltaE = deltaE;
chroma.distance = distance;
chroma.limits = limits;
chroma.valid = valid;

// scale
chroma.scales = scales;



export default chroma;
