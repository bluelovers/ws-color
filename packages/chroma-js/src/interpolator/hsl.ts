import '../io/hsl';
import interpolate_hsx from './_hsx';

const hsl = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hsl');
}

declare module './index'
{
	interface IInterpolator
	{
		hsl(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hsl = hsl;

export default hsl;
