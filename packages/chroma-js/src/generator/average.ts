import Color from '../Color';
import clip_rgb from '../utils/clip_rgb';
import { IInterpolationMode } from '../types';
import arr2colors from '../utils/arr-to-colors';
import typePredicates from 'ts-type-predicates';

declare module '../chroma'
{
	interface chroma
	{
		average: typeof average
	}
}

function average(colors: (string | Color)[], mode: IInterpolationMode = 'lrgb', weights?: number[]): Color
{
	const l = colors.length;
	if (!weights) weights = Array.from(new Array(l)).map(() => 1);
	// normalize weights
	const k = l / weights.reduce(function (a, b) { return a + b; });
	weights.forEach((w, i) => { weights[i] *= k })
	// convert colors to Color objects

	colors = arr2colors(colors);

	typePredicates<Color[]>(colors);

	if (mode === 'lrgb')
	{
		return _average_lrgb(colors, weights)
	}

	const first = colors.shift() as Color;
	const xyz = first.get<number[]>(mode);
	const cnt: number[] = [];
	let dx = 0;
	let dy = 0;
	// initial color
	for (let i = 0; i < xyz.length; i++)
	{
		xyz[i] = (xyz[i] || 0) * weights[0];
		cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
		if (mode.charAt(i) === 'h' && !isNaN(xyz[i]))
		{
			const A = xyz[i] / 180 * Math.PI;
			dx += Math.cos(A) * weights[0];
			dy += Math.sin(A) * weights[0];
		}
	}

	let alpha = first.alpha() * weights[0];
	colors.forEach((c, ci) =>
	{
		const xyz2 = c.get<number[]>(mode);
		alpha += c.alpha() * weights[ci + 1];
		for (let i = 0; i < xyz.length; i++)
		{
			if (!isNaN(xyz2[i]))
			{
				cnt[i] += weights[ci + 1];
				if (mode.charAt(i) === 'h')
				{
					const A = xyz2[i] / 180 * Math.PI;
					dx += Math.cos(A) * weights[ci + 1];
					dy += Math.sin(A) * weights[ci + 1];
				}
				else
				{
					xyz[i] += xyz2[i] * weights[ci + 1];
				}
			}
		}
	});

	for (let i = 0; i < xyz.length; i++)
	{
		if (mode.charAt(i) === 'h')
		{
			let A = Math.atan2(dy / cnt[i], dx / cnt[i]) / Math.PI * 180;
			while (A < 0) A += 360;
			while (A >= 360) A -= 360;
			xyz[i] = A;
		}
		else
		{
			xyz[i] = xyz[i] / cnt[i];
		}
	}
	alpha /= l;
	return (new Color(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
};

function _average_lrgb(colors: Color[], weights: number[])
{
	const l = colors.length;
	const xyz = [0, 0, 0, 0];
	for (let i = 0; i < colors.length; i++)
	{
		const col = colors[i];
		const f = weights[i] / l;
		const rgb = col._rgb;
		xyz[0] += Math.pow(rgb[0], 2) * f;
		xyz[1] += Math.pow(rgb[1], 2) * f;
		xyz[2] += Math.pow(rgb[2], 2) * f;
		xyz[3] += rgb[3] * f;
	}
	xyz[0] = Math.sqrt(xyz[0]);
	xyz[1] = Math.sqrt(xyz[1]);
	xyz[2] = Math.sqrt(xyz[2]);
	if (xyz[3] > 0.9999999) xyz[3] = 1;
	return new Color(clip_rgb(xyz));
}

export default average
