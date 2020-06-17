import Color from '../../Color';
import input, { setupInputAutodetect, setupInputFormat } from '../input';
import rgb2hex, { IRgb2HexMode } from '../hex/rgb2hex';

import { IColorSpaces } from '../../types';
import named2rgb, { hex2name, _named2rgb, rgba_is_transparent } from './named2rgb';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns the named color. Falls back to hexadecimal RGB string, if the color isn't present.
		 */
		named(): string;
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		named(name: string): IColorSpaces["rgba"]
	}
}

Color.prototype.named = function ()
{
	if (rgba_is_transparent(this._rgb))
	{
		return 'transparent'
	}

	const hex = rgb2hex(this._rgb, 'rgb');

	if (this._rgb[0] === null || this._rgb[1] === null || this._rgb[2] === null)
	{

		return hex
	}

	return hex2name(hex)?.toLowerCase?.() ?? (this._rgb[0] === null &&  hex);
};

setupInputFormat('named', (name) =>
{
	return named2rgb(name)
})

setupInputAutodetect({
	p: 5,
	test: (name, ...rest) =>
	{
		if (!rest.length && typeof name === 'string' && _named2rgb(name)?.length)
		{
			return 'named';
		}
	},
});
