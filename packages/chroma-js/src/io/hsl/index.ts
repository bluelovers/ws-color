import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';

import rgb2hsl from './rgb2hsl';

import hsl2rgb from './hsl2rgb';
import { IColorSpaces } from '../../types';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns an array with the `hue`, `saturation`, and `lightness`
		 * component. Hue is the color angle in degree (`0..360`), saturation
		 * and lightness are within `0..1`. Note that for hue-less colors
		 * (black, white, and grays), the hue component will be NaN.
		 *
		 * @example
		 * chroma('orange').hsl() === [38.82,1,0.5,1]
		 * chroma('white').hsl() === [NaN,0,1,1]
		 */
		hsl(): IColorSpaces["hsl"]
	}
}

Color.prototype.hsl = function ()
{
	return rgb2hsl(this._rgb);
};

chroma.hsl = (...args) => new Color(...args, 'hsl');

input.format.hsl = hsl2rgb;

setupInputAutodetect({
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
