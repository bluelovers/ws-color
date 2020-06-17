import unpack from '../../utils/unpack';
import type from '../../utils/type';
import chroma from '../../chroma';
import Color from '../../Color';
import input from '../input';

import rgb2hsl from './rgb2hsl';

import hsl2rgb from './hsl2rgb';

Color.prototype.hsl = function ()
{
	return rgb2hsl(this._rgb);
};

chroma.hsl = (...args) => new Color(...args, 'hsl');

input.format.hsl = hsl2rgb;

input.autodetect.push({
	p: 2,
	test: (...args) =>
	{
		args = unpack(args, 'hsl');
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hsl';
		}
	},
});
