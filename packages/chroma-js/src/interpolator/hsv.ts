import '../io/hsv';
import interpolate_hsx from './_hsx';

const hsv = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hsv');
}

declare module './index'
{
	interface IInterpolator
	{
		hsv(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hsv = hsv;

export default hsv;
