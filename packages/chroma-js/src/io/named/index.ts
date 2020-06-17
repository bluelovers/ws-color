import Color from '../../Color';
import input from '../input';


import w3cx11 from '../../colors/w3cx11';
import hex2rgb from '../hex/hex2rgb';
import rgb2hex, { IRgb2HexMode } from '../hex/rgb2hex';

import type from '../../utils/type';
import { IColorSpaces } from '../../types';

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
	for (let n of Object.keys(w3cx11))
	{
		if (w3cx11[n] === hex) return n.toLowerCase();
	}
	return hex;
};

input.format.named = (name) =>
{
	name = name.toLowerCase();
	if (w3cx11[name]) return hex2rgb(w3cx11[name]);
	throw new Error('unknown color name: ' + name);
}

input.autodetect.push({
	p: 5,
	test: (h, ...rest) =>
	{
		if (!rest.length && typeof h === 'string' && w3cx11[h.toLowerCase()])
		{
			return 'named';
		}
	},
});
