//
// interpolates between a set of colors uzing a bezier spline
//

// @requires utils lab
import Color from '../Color';
import '../io/lab';
import scale from './scale';
import arr2colors from '../utils/arr-to-colors';
import typePredicates from 'ts-type-predicates';
import { IScale } from '../types';

const _bezier = function (colors: (Color | string)[]): IBezier
{
	let I, lab0, lab1, lab2;

	colors = arr2colors(colors);
	typePredicates<Color[]>(colors);

	if (colors.length === 2)
	{
		// linear interpolation
		[lab0, lab1] = colors.map(c => c.lab());
		I = function (t)
		{
			const lab = ([0, 1, 2].map((i) => lab0[i] + (t * (lab1[i] - lab0[i]))));
			return new Color(lab, 'lab');
		};
	}
	else if (colors.length === 3)
	{
		// quadratic bezier interpolation
		[lab0, lab1, lab2] = colors.map(c => c.lab());
		I = function (t)
		{
			const lab = ([
				0,
				1,
				2,
			].map((i) => ((1 - t) * (1 - t) * lab0[i]) + (2 * (1 - t) * t * lab1[i]) + (t * t * lab2[i])));
			return new Color(lab, 'lab');
		};
	}
	else if (colors.length === 4)
	{
		// cubic bezier interpolation
		let lab3;
		[lab0, lab1, lab2, lab3] = colors.map(c => c.lab());
		I = function (t)
		{
			const lab = ([
				0,
				1,
				2,
			].map((i) => ((1 - t) * (1 - t) * (1 - t) * lab0[i]) + (3 * (1 - t) * (1 - t) * t * lab1[i]) + (3 * (1 - t) * t * t * lab2[i]) + (t * t * t * lab3[i])));
			return new Color(lab, 'lab');
		};
	}
	else if (colors.length === 5)
	{
		const I0 = _bezier(colors.slice(0, 3));
		const I1 = _bezier(colors.slice(2, 5));
		I = function (t)
		{
			if (t < 0.5)
			{
				return I0(t * 2);
			}
			else
			{
				return I1((t - 0.5) * 2);
			}
		};
	}
	return I;
};

declare module '../chroma'
{
	interface chroma
	{
		bezier: typeof bezier
	}
}

export interface IBezier
{
	(t: number): Color,
	scale(): IScale
}

const bezier = (colors: string[]): IBezier =>
{
	const f = _bezier(colors);
	f.scale = () => scale(f as any);
	return f;
}

export default bezier
