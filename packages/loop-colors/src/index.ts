/**
 * Created by user on 2020/6/17.
 */

export function cssColors()
{
	return [
		'#906',
		'#66F',
		'#800',
		'#C60',
		'#EAEA00',
		'#006',
		'#360',
	];
}

export type ICliColor = "cyan" | "magenta" | "blue" | "yellow" | "green" | "red";

export function cliColors(): ICliColor[]
{
	return ["cyan", "magenta", "blue", "yellow", "green", "red"];
}

export interface IOptions<T = string, R = T>
{
	rand?: ((index?: number, length?: number, ...argv: any[]) => number) | boolean;
	limit?: number | -1;
	generator?(colors: readonly T[], position: number, idx: number, len: number): R
}

export function loopColors<T, R = T>(colors: T[] | readonly T[], options?: IOptions<T, R>)
{
	options ??= {};

	colors = colors.slice();

	let idx = 0;
	const len = colors.length;
	// @ts-ignore
	let getIndex = (index: number, length: number) => idx++ % len;

	if (options.rand)
	{
		const rand = options.rand === true ? Math.random : options.rand;

		const _ = getIndex;
		getIndex = (index: number, length: number) =>
		{
			idx = Math.floor(idx * rand(index, length));
			return _(index, length);
		};
	}

	let limit = options.limit | 0;
	limit = limit > 0 ? limit : Infinity;

	// @ts-ignore
	const generator: IOptions<T, R>["generator"] = options.generator ?? ((colors, position) => colors[position]);

	return function* (startIndex?: number)
	{
		if (typeof startIndex !== 'undefined')
		{
			startIndex |= 0;
			idx = startIndex >= 0 ? startIndex : idx;
		}
		else
		{
			idx = 0;
		}

		do
		{
			yield generator(colors, getIndex(idx, len), idx, len);
		}
		while (--limit > 0);
	};
}

export default loopColors;
