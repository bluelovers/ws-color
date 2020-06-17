/**
 * Created by user on 2020/6/17.
 */
import { IColorSpaces } from '../types';

export type IRGBValue = IColorSpaces["rgba"] | IColorSpaces["rgb"] | number[];

export interface IOptionsRand
{
	fn?(index: number, value: number, rgba: IColorSpaces["rgba"]): number,
	includeAlpha?: boolean
}

function rand(rgba?: IRGBValue, options?: IOptionsRand): IColorSpaces["rgba"]
{
	rgba = rgba?.slice?.() ?? [];
	let { fn = Math.random as typeof options.fn, includeAlpha } = options ?? {};

	let i: number;
	for (i = 0; i < 3; i++)
	{
		let value = rgba[i] ?? 255;
		value |= 0;

		rgba[i] = fn(i, value, rgba as IColorSpaces["rgba"]) * (1 + value);
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

export default rand
