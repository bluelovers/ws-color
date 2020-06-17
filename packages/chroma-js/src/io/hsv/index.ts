import unpack from '../../utils/unpack';
import type from '../../utils/type';
import chroma from '../../chroma';
import Color from '../../Color';
import input from '../input';

import rgb2hsv from './rgb2hsv';

import hsv2rgb from './hsv2rgb';

Color.prototype.hsv = function ()
{
	return rgb2hsv(this._rgb);
};

chroma.hsv = (...args) => new Color(...args, 'hsv');

input.format.hsv = hsv2rgb;

input.autodetect.push({
	p: 2,
	test: (...args) =>
	{
		args = unpack(args, 'hsv');
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hsv';
		}
	},
});
