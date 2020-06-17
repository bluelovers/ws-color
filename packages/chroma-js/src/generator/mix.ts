import Color from '../Color';

import interpolator, { IInterpolator, IInterpolatorMode } from '../interpolator';
import type from '../utils/type';

declare module '../chroma'
{
	interface chroma
	{
		mix(col1: Color, col2: Color, f?: number, mode?: IInterpolatorMode): Color;
		interpolate(col1: Color, col2: Color, f?: number, mode?: IInterpolatorMode): Color;
	}
}

const mix = (col1: Color, col2: Color, f = 0.5, ...rest: [IInterpolatorMode]): Color =>
{
	let mode = rest[0] || 'lrgb';
	if (!interpolator[mode] && !rest.length)
	{
		// fall back to the first supported mode
		mode = Object.keys(interpolator)[0];
	}
	if (!interpolator[mode])
	{
		throw new Error(`interpolation mode ${mode} is not defined`);
	}
	if (type(col1) !== 'object') col1 = new Color(col1);
	if (type(col2) !== 'object') col2 = new Color(col2);
	return interpolator[mode](col1, col2, f)
		.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
}

export default mix
