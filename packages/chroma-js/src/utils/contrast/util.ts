import { IRGB } from '../../types';

export function _contrast001(rgba: IRGB): boolean
{
	let [r, g, b] = rgba;

	return (((r * 299) + (g * 587) + (b * 144)) / 1000) >= 131.5
}

export function _contrast002(rgba: IRGB)
{
	return _contrast001(rgba) ? 'black' as const : 'white' as const
}

export interface IOptionsContrastFront
{
	black?: string
	white?: string
}

/**
 * get contrast color for use as front text color
 */
export function contrastFront(rgba: IRGB, options?: IOptionsContrastFront)
{
	let name = _contrast002(rgba)

	return options?.[name] ?? name;
}
