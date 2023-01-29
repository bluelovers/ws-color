import { toFixedNumber } from "@lazy-num/to-fixed-number";
import { IColorRGBArray, IColorRGBObject } from '@lazy-color/types';

export type IColorRGBA = readonly number[] | IColorRGBArray;

export interface IOptionsRandColorUtil
{
	randFn?(): number
}

export function _handleOptions(opts?: IOptionsRandColorUtil): IOptionsRandColorUtil
{
	return {
		randFn: opts?.randFn ?? Math.random,
	}
}

export function _randAlpha(opts?: IOptionsRandColorUtil)
{
	return toFixedNumber(_handleOptions(opts).randFn(), 3)
}

export function _randValue(base: number, opts?: IOptionsRandColorUtil)
{
	return _handleOptions(opts).randFn() * base
}

export function _rgbRand<T extends IColorRGBA>(_rgba?: T, opts?: IOptionsRandColorUtil): T
{
	// @ts-ignore
	_rgba = _rgba?.slice() || [];

	for (let i = 0; i < 3; i++)
	{
		// @ts-ignore
		_rgba[i] = Math.round(_randValue(_rgba[i] ?? 255, opts));
	}

	return _rgba
}

export function _rgbObjectRand<T extends IColorRGBObject>(_rgba?: T, opts?: IOptionsRandColorUtil)
{
	let { r, g, b, a } = _rgba ?? {};

	r = Math.round(_randValue(r ?? 255, opts));
	g = Math.round(_randValue(g ?? 255, opts));
	b = Math.round(_randValue(b ?? 255, opts));

	return { r, g, b, a }
}

export function _rgbObjectToArray<T extends { r: number, g: number, b: number, a?: number }>(_rgba: T): IColorRGBArray
{
	const { r, g, b, a } = _rgba;
	return [r, g, b, a]
}

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(_rgbRand, "__esModule", { value: true });

	Object.defineProperty(_rgbRand, '_rgbRand', { value: _rgbRand });
	Object.defineProperty(_rgbRand, 'default', { value: _rgbRand });

	Object.defineProperty(_rgbRand, '_randAlpha', { value: _randAlpha });
	Object.defineProperty(_rgbRand, '_randValue', { value: _randValue });
	Object.defineProperty(_rgbRand, '_rgbObjectRand', { value: _rgbObjectRand });
	Object.defineProperty(_rgbRand, '_rgbObjectToArray', { value: _rgbObjectToArray });

	Object.defineProperty(_rgbRand, '_handleOptions', { value: _handleOptions });
}

export default _rgbRand
