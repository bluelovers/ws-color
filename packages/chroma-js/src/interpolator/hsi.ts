import '../io/hsi';
import interpolate_hsx from './_hsx';

const hsi = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hsi');
}

declare module './index'
{
	interface IInterpolator
	{
		hsi(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hsi = hsi;

export default hsi;
