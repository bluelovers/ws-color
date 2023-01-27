import { toFixedNumber } from "@lazy-num/to-fixed-number";

export type IColorRGBA = readonly number[] | readonly [number, number, number, number?];

export function _randAlpha()
{
	return toFixedNumber(Math.random(), 3)
}

export function _randValue(base: number)
{
	return Math.random() * base
}

export function _rgbRand<T extends IColorRGBA>(_rgba?: T)
{
	// @ts-ignore
	_rgba = _rgba?.slice() || [];

	for (let i = 0; i < 3; i++)
	{
		// @ts-ignore
		_rgba[i] = Math.round(_randValue(_rgba[i] ?? 255));
	}

	return _rgba
}

export function _rgbObjectRand<T extends { r: number, g: number, b: number, a?: number }>(_rgba?: T)
{
	let { r, g, b, a } = _rgba;

	r = Math.round(_randValue(r ?? 255));
	g = Math.round(_randValue(g ?? 255));
	b = Math.round(_randValue(b ?? 255));

	return { r, g, b, a }
}

export function _rgbObjectToArray<T extends { r: number, g: number, b: number, a?: number }>(_rgba: T)
{
	const { r, g, b, a } = _rgba;
	return [r, g, b, a] as const
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
}

export default _rgbRand
