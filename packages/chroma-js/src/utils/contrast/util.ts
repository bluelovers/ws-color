import { IRGB } from '../../types';

const enum EnumContrastFrontThreshold
{
	t01 = 131.5,
	t02 = 120,
}

export function _contrast000(rgba: IRGB)
{
	let [r, g, b] = rgba;

	return (((r * 299) + (g * 587) + (b * 144)) / 1000)
}

export function _contrast001(rgba: IRGB, threshold = EnumContrastFrontThreshold.t02): boolean
{
	return _contrast000(rgba) >= threshold
}

export function _contrast002(rgba: IRGB, threshold?: number)
{
	return _contrast001(rgba, threshold) ? 'black' as const : 'white' as const
}

export interface IOptionsContrastFront
{
	black?: string
	white?: string
	threshold?: number,
}

/**
 * get contrast color for use as front text color
 */
export function contrastFront(rgba: IRGB, options?: IOptionsContrastFront)
{
	let name = _contrast002(rgba)

	return options?.[name] ?? name;
}
