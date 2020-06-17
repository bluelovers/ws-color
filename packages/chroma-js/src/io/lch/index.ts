import unpack from '../../utils/unpack';
import type from '../../utils/type';
import chroma from '../../chroma';
import Color from '../../Color';
import input from '../input';

import rgb2lch from './rgb2lch';

import lch2rgb from './lch2rgb';

import hcl2rgb from './hcl2rgb';

Color.prototype.lch = function () { return rgb2lch(this._rgb); };
Color.prototype.hcl = function () { return rgb2lch(this._rgb).reverse() as any; };

chroma.lch = (...args) => new Color(...args, 'lch');
chroma.hcl = (...args) => new Color(...args, 'hcl');

input.format.lch = lch2rgb;
input.format.hcl = hcl2rgb;

(['lch', 'hcl'] as const).forEach(m => input.autodetect.push({
	p: 2,
	test: (...args) =>
	{
		args = unpack(args, m);
		if (Array.isArray(args) && args.length === 3)
		{
			return m;
		}
	},
}));
