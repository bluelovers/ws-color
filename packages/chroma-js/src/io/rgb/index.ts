import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect, setupInputFormat } from '../input';
import unpack from '../../utils/unpack';

import { IColorSpaces } from '../../types';
const { round } = Math;

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns an array with the red, green, and blue component, each as
		 * number within the range 0..255. Chroma internally stores RGB
		 * channels as floats but rounds the numbers before returning them.
		 * You can pass false to prevent the rounding.
		 *
		 * @example
		 * chroma('orange').rgb() === [255,165,0]
		 * chroma('orange').darken().rgb() === [198,118,0]
		 * chroma('orange').darken().rgb(false) === [198.05,118.11,0]
		 */
		rgb(round?: boolean): IColorSpaces["rgb"]
		/**
		 * Just like color.rgb but adds the alpha channel to the returned array.
		 *
		 * @example
		 * chroma('orange').rgba() === [255,165,0,1]
		 * chroma('hsla(20, 100%, 40%, 0.5)').rgba() === [204,68,0,0.5]
		 */
		rgba(round?: boolean): IColorSpaces["rgba"]
	}
}

Color.prototype.rgb = function (rnd = true): IColorSpaces["rgb"]
{
	if (rnd === false) return this._rgb.slice(0, 3) as any;
	return this._rgb.slice(0, 3).map(round) as any;
}

Color.prototype.rgba = function (rnd = true): IColorSpaces["rgba"]
{
	return this._rgb.slice(0, 4).map((v, i) =>
	{
		return i < 3 ? (rnd === false ? v : round(v)) : v;
	}) as any;
};

chroma.rgba = chroma.rgb = (...args) => new Color(...args, 'rgb');

/*
input.format.rgba = input.format.rgb = (...args) =>
{
	const rgba = unpack(args, 'rgba');
	rgba[3] = rgba[3] ?? 1;
	return rgba;
};
 */

setupInputFormat([
	'rgba',
	'rgb',
], (...args) =>
{
	const rgba = unpack(args, 'rgba');
	rgba[3] = rgba[3] ?? 1;
	return rgba;
})

setupInputAutodetect({
	p: 3,
	test: (...args) =>
	{
		args = unpack(args, 'rgba');
		if (Array.isArray(args) && (args.length === 3 ||
			args.length === 4 && typeof args[3] === 'number' && args[3] >= 0 && args[3] <= 1))
		{
			return 'rgb';
		}
	},
});
