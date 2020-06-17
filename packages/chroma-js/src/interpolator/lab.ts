import '../io/lab';

import Color from '../Color';

declare module './index'
{
	interface IInterpolator
	{
		lab(col1: Color, col2: Color, f?: number): Color
	}
}

const lab = (col1: Color, col2: Color, f?: number) =>
{
	const xyz0 = col1.lab();
	const xyz1 = col2.lab();
	return new Color(
		xyz0[0] + f * (xyz1[0] - xyz0[0]),
		xyz0[1] + f * (xyz1[1] - xyz0[1]),
		xyz0[2] + f * (xyz1[2] - xyz0[2]),
		'lab',
	)
}

// register interpolator
import interpolator from './index';
interpolator.lab = lab;

export default lab;
