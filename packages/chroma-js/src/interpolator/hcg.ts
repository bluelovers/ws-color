import '../io/hcg';
import interpolate_hsx from './_hsx';

const hcg = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hcg');
}

declare module './index'
{
	interface IInterpolator
	{
		hcg(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hcg = hcg;

export default hcg;
