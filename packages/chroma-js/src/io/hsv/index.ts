import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';

import rgb2hsv from './rgb2hsv';

import hsv2rgb from './hsv2rgb';
import { IColorSpaces } from '../../types';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns an array with the `hue`, `saturation`, and `value`
		 * components. Hue is the color angle in degree (`0..360`),
		 * saturation and value are within `0..1`. Note that for hue-less
		 * colors (black, white, and grays), the hue component will be NaN.
		 *
		 * @example
		 * chroma('orange').hsv() === [38.82,1,1]
		 * chroma('white').hsv() === [NaN,0,1]
		 */
		hsv(): IColorSpaces["hsv"]
	}
}

Color.prototype.hsv = function ()
{
	return rgb2hsv(this._rgb);
};

chroma.hsv = (...args) => new Color(...args, 'hsv');

input.format.hsv = hsv2rgb;

setupInputAutodetect({
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
