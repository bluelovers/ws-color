import unpack from '../../utils/unpack';


import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';
import { IColorSpaces } from '../../types';

import rgb2lab from './rgb2lab';

import lab2rgb from './lab2rgb';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns an array with the **L**, **a**, and **b** components.
		 *
		 * @example
		 * chroma('orange').lab() === [74.94,23.93,78.95]
		 */
		lab(): IColorSpaces["lab"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		lab(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		lab: typeof lab2rgb
	}
}

Color.prototype.lab = function ()
{
	return rgb2lab(this._rgb);
};

chroma.lab = (...args) => new Color(...args, 'lab');

input.format.lab = lab2rgb;

setupInputAutodetect({
	p: 2,
	test(...args)
	{
		args = unpack(args, 'lab');
		if (Array.isArray(args) && args.length === 3)
		{
			return 'lab';
		}
	},
});
