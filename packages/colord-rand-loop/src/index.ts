import { cssColors, IOptions, loopColors } from 'loop-colors';
import { colord, Colord, random } from 'colord';
import { _rgbObjectRand } from '@lazy-color/rand-util';
import { ITSArrayListMaybeReadonly } from 'ts-type';
import { AnyColor } from 'colord/types';

export type IColorInput = AnyColor | Colord;

export interface IOptionsColordRandLoop extends IOptions<IColorInput, Colord>
{
	cache?: Set<string>
	colors?: ITSArrayListMaybeReadonly<IColorInput>
}

export function createDefaultGenerator({
	cache,
}: IOptionsColordRandLoop)
{
	cache ??= new Set<string>();

	return (colors: ITSArrayListMaybeReadonly<IColorInput>, position: number) =>
	{
		let cc = colord(colors[position]);
		if (!cc.isValid())
		{
			cc = random()
		}
		const _rgba = cc.toRgb();

		let e = 0;
		let result = cc;

		while (cache.has(result.toRgbString()))
		{
			if (e > 5)
			{
				cache.clear();
				e = 0;
			}

			result = colord(_rgbObjectRand(_rgba))
			e++;
		}

		cache.add(result.toRgbString());

		return result
	}
}

export function createColordRandLoop(options?: IOptionsColordRandLoop)
{
	let {
		colors,
		cache,
		...opts
	} = {
		...options,
	};
	colors ??= cssColors() as any;
	cache ??= new Set<string>();
	opts.generator ??= createDefaultGenerator({
		cache,
	});

	return loopColors<IColorInput, Colord>(colors, opts)
}

export function colordRandLoop(startIndex?: number, options?: IOptionsColordRandLoop)
{
	return createColordRandLoop(options)(startIndex)
}

export default colordRandLoop

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(colordRandLoop, "__esModule", { value: true });

	Object.defineProperty(colordRandLoop, 'colordRandLoop', { value: colordRandLoop });
	Object.defineProperty(colordRandLoop, 'default', { value: colordRandLoop });

	Object.defineProperty(colordRandLoop, 'createDefaultGenerator', { value: createDefaultGenerator });

	Object.defineProperty(colordRandLoop, 'createColordRandLoop', { value: createColordRandLoop });
}
