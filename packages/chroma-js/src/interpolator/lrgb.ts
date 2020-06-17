import Color from '../Color';
import interpolator from './index';
const { sqrt, pow } = Math;

declare module './index'
{
	interface IInterpolator
	{
		lrgb(col1: Color, col2: Color, f?: number): Color
	}
}

export const lrgb = (col1: Color, col2: Color, f: number) =>
{
	const [x1, y1, z1] = col1._rgb;
	const [x2, y2, z2] = col2._rgb;
	return new Color(
		sqrt(pow(x1, 2) * (1 - f) + pow(x2, 2) * f),
		sqrt(pow(y1, 2) * (1 - f) + pow(y2, 2) * f),
		sqrt(pow(z1, 2) * (1 - f) + pow(z2, 2) * f),
		'rgb',
	)
}

// register interpolator
interpolator.lrgb = lrgb;

export default lrgb;
