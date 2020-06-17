import Color from '../../Color';
import input from '../input';
import rgb2hex, { IRgb2HexMode } from '../hex/rgb2hex';

import { IColorSpaces } from '../../types';
import named2rgb, { _named2rgb, hex2name } from './named2rgb';

declare module '../../Color'
{
	interface Color
	{
		name(): string;
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		named(name: string): IColorSpaces["rgba"]
	}
}

Color.prototype.name = function ()
{
	const hex = rgb2hex(this._rgb, 'rgb');
	return hex2name(hex)?.toLowerCase?.() ?? hex;
};

input.format.named = (name) =>
{
	return named2rgb(name)
}

input.autodetect.push({
	p: 5,
	test: (name, ...rest) =>
	{
		if (!rest.length && typeof name === 'string' && _named2rgb(name)?.length)
		{
			return 'named';
		}
	},
});
