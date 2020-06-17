import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';

import rgb2hsi from './rgb2hsi';

import hsi2rgb from './hsi2rgb';
import { IColorSpaces } from '../../types';
import hcg2rgb from '../hcg/hcg2rgb';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns an array with the `hue`, `saturation`, and `intensity`
		 * components, each as number between 0 and 255. Note that for hue-less
		 *  colors (black, white, and grays), the hue component will be NaN.
		 *
		 * @example
		 * chroma('orange').hsi() === [39.64,1,0.55]
		 * chroma('white').hsi() === [NaN,0,1]
		 */
		hsi(): IColorSpaces["hsi"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		hsi(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		hsi: typeof hsi2rgb
	}
}

Color.prototype.hsi = function ()
{
	return rgb2hsi(this._rgb);
};

chroma.hsi = (...args) => new Color(...args, 'hsi');

input.format.hsi = hsi2rgb;

setupInputAutodetect({
	p: 2,
	test: (...args) =>
	{
		args = unpack(args, 'hsi');
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hsi';
		}
	},
});
