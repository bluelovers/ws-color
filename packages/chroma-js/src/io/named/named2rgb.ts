/**
 * Created by user on 2020/6/17.
 */

import colors, { IColorNames } from '../../colors/index';
import '../../colors/w3cx11';

import hex2rgb from '../hex/hex2rgb';
import { IColorSpaces } from '../../types';
import rgb2hex from '../hex/rgb2hex';

export function _named2rgb(name: keyof IColorNames | string): IColorSpaces["rgba"]
{
	let value = colors[name.toLowerCase() as keyof IColorNames];
	if (value?.length)
	{
		if (typeof value === 'string')
		{
			return hex2rgb(value);
		}
		else if (Array.isArray(value) && value.length === 4)
		{
			return value.slice() as IColorSpaces["rgba"];
		}
	}
}

export function hex2name(hex: string)
{
	for (let name in colors)
	{
		let value = colors[name as keyof IColorNames];

		if (typeof value !== 'string')
		{
			value = rgb2hex(value)
		}

		if (value === hex)
		{
			return name
		}
	}
}

export function named2rgb(name: keyof IColorNames | string)
{
	let value = _named2rgb(name);

	if (value?.length)
	{
		return value;
	}

	throw new Error('unknown color name: ' + name)
}

export default named2rgb
