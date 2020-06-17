import Color from '../../Color';
import chroma from '../../chroma';
import input from '../input';
import unpack from '../../utils/unpack';
import { IColorSpaces } from '../../types';

input.format.gl = (...args) =>
{
	const rgb = unpack(args, 'rgba');
	rgb[0] *= 255;
	rgb[1] *= 255;
	rgb[2] *= 255;
	return rgb;
}

declare module '../../chroma'
{
	interface chroma
	{
		/**
		 * GL is a variant of RGB(A), with the only difference that the components are normalized to the range of 0..1.
		 */
		gl(red: number, green: number, blue: number, alpha?: number): Color;
		gl(...args): Color
	}
}

chroma.gl = (...args) => new Color(...args, 'gl');

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns an array with the cyan, magenta, yellow, and key (black)
		 * components, each as a normalized value between 0 and 1.
		 *
		 * @example
		 * chroma('33cc00').gl() === [0.2,0.8,0,1]
		 */
		gl(): IColorSpaces["gl"];
	}
}

Color.prototype.gl = function ()
{
	const rgb = this._rgb;
	return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgb[3]];
};
