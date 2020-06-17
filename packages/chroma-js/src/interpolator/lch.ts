import '../io/lch';
import interpolate_hsx from './_hsx';

const lch = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'lch');
}

declare module './index'
{
	interface IInterpolator
	{
		lch(col1: Color, col2: Color, f?: number): Color
		hcl(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.lch = lch;
interpolator.hcl = lch;

export default lch;
