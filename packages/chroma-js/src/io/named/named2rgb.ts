/**
 * Created by user on 2020/6/17.
 */

import colors, { IColorNames } from '../../colors/index';
import '../../colors/w3cx11';
import rgb2hex from '../hex/rgb2hex';
import { IColorSpaces, IRGB } from '../../types';
import hex2rgb from '../hex/hex2rgb';

export function hex2name(hex: string)
{
	for (let name in colors)
	{
		if (name[0] === '_' || name === 'transparent')
		{
			continue;
		}

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

export function named2rgb(name: keyof IColorNames | string)
{
	let value = _named2rgb(name);

	if (value?.length)
	{
		return value;
	}

	throw new Error('unknown color name: ' + name)
}

export function rgba_is_transparent(rgba: IRGB)
{
	return rgba[0] === null && rgba[1] === null && rgba[2] === null && rgba[3] === 1
}

export default named2rgb
