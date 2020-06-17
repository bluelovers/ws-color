import '../io/num';

import Color from '../Color';

const num = (col1, col2, f) =>
{
	const c1 = col1.num();
	const c2 = col2.num();
	return new Color(c1 + f * (c2 - c1), 'num')
}

declare module './index'
{
	interface IInterpolator
	{
		num(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
interpolator.num = num;

export default num;
