/**
 * Created by user on 2020/6/17.
 */
import { IColorSpaces, IRGBValue } from '../types';

const digits = '0123456789abcdef';

export interface IOptionsRand
{
	fn?(index?: number, value?: number, rgba?: IColorSpaces["rgba"]): number,
	includeAlpha?: boolean
	round?: boolean,
	length?: number,
	rgba?: IRGBValue,
}

export function _handleOptions<T extends IOptionsRand>(options?: T): T
{
	let { fn = Math.random as typeof options.fn, includeAlpha } = options ?? {};

	return {
		...options,
		fn,
		includeAlpha,
	}
}

export function rand(options?: IOptionsRand): IColorSpaces["rgba"]
{

	let { rgba, fn, includeAlpha, round } = _handleOptions(options);

	rgba = rgba?.slice?.() ?? [];

	let i: number;
	for (i = 0; i < 3; i++)
	{
		let value = rgba[i] ?? 255;
		value |= 0;

		value = fn(i, value, rgba as IColorSpaces["rgba"]) * (1 + value);

		if (round === true)
		{
			value = Math.round(value)
		}

		rgba[i] = value;
	}

	rgba[3] = rgba[3] ?? 1;

	if (includeAlpha)
	{
		let value = isNaN(rgba[3]) ? 1 : rgba[3];

		value = fn(i, value, rgba as IColorSpaces["rgba"]) * value

		rgba[3] = Math.max(Math.min(value, 255), 0)
	}

	return rgba as any
}

export function _randomHex(options?: IOptionsRand)
{
	let { fn, includeAlpha, length } = _handleOptions(options);

	length = length > 0 ? length : (includeAlpha ? 8 : 6);

	let ls = [] as string[]
	for (let i = 0; i < length; i++)
	{
		let code = digits.charAt(Math.floor(fn(i) * 16));
		ls.push(code)
	}

	return ls.join('');
}

export function randomHex(options?: IOptionsRand)
{
	delete options?.length

	return _randomHex(options)
}

export default rand
