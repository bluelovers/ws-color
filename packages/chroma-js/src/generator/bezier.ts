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
			const linearInterpolation = (x0, x1) => x0 + (t * (x1 - x0));

			const lab = ([0, 1, 2].map((i) => linearInterpolation(lab0[i], lab1[i])));

			const alpha = linearInterpolation((colors[0] as Color).alpha(), (colors[1] as Color).alpha());

			return new Color(lab, 'lab').alpha(alpha);
		};
	}
	else if (colors.length === 3)
	{
		// quadratic bezier interpolation
		[lab0, lab1, lab2] = colors.map(c => c.lab());
		I = function (t)
		{
			const quadraticInterpolation = (x0, x1, x2) => ((1 - t) * (1 - t) * x0) + (2 * (1 - t) * t * x1) + (t * t * x2)

			const lab = ([0, 1, 2].map((i) => quadraticInterpolation(lab0[i], lab1[i], lab2[i])));

			const alpha = quadraticInterpolation((colors[0] as Color).alpha(), (colors[1] as Color).alpha(), (colors[2] as Color).alpha());

			return new Color(lab, 'lab').alpha(alpha);
		};
	}
	else if (colors.length === 4)
	{
		// cubic bezier interpolation
		let lab3;
		[lab0, lab1, lab2, lab3] = colors.map(c => c.lab());
		I = function (t)
		{
			const cubicInterpolation = (x0,
				x1,
				x2,
				x3,
			) => ((1 - t) * (1 - t) * (1 - t) * x0) + (3 * (1 - t) * (1 - t) * t * x1) + (3 * (1 - t) * t * t * x2) + (t * t * t * x3);

			const lab = ([0, 1, 2].map((i) => cubicInterpolation(lab0[i], lab1[i], lab2[i], lab3[i])));

			const alpha = cubicInterpolation((colors[0] as Color).alpha(), (colors[1] as Color).alpha(), (colors[2] as Color).alpha(), (colors[3] as Color).alpha());

			return new Color(lab, 'lab').alpha(alpha);
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
		/**
		 * Returns a function that
		 * [bezier-interpolates]{@link https://www.vis4.net/blog/posts/mastering-multi-hued-color-scales/} between
		 * colors in Lab space. The input range of the function is [0..1].
		 * You can convert it to a scale instance by calling <code>chroma.bezier(...).scale()</code>
		 * 回傳一個在 Lab 色彩空間中對色彩進行 Bezier 插值的函式。輸入範圍為 [0..1]。
		 * 可透過 <code>chroma.bezier(...).scale()</code> 轉換為比例尺實例。
		 *
		 * @param colors - 色彩陣列 (2-5 個色彩) / Array of colors (2-5 colors)
		 * @returns Bezier 插值函式 / Bezier interpolation function
		 * @example
		 * ```typescript
		 * // 基本線性插值 (2 個色彩)
		 * const twoColor = chroma.bezier(['red', 'blue']);
		 * twoColor(0);   // returns red
		 * twoColor(0.5); // returns purple
		 * twoColor(1);   // returns blue
		 *
		 * // 二次 Bezier 插值 (3 個色彩)
		 * const threeColor = chroma.bezier(['red', 'yellow', 'blue']);
		 * threeColor(0.5); // returns yellow
		 *
		 * // 三次 Bezier 插值 (4 個色彩)
		 * const fourColor = chroma.bezier(['red', 'green', 'blue', 'white']);
		 * fourColor(0.5);
		 * ```
		 * @example
		 * ```typescript
		 * // 轉換為比例尺以便重複使用
		 * const myScale = chroma.bezier(['#e74c3c', '#f39c12', '#2ecc71', '#3498db']).scale();
		 * myScale(0);   // first color
		 * myScale(0.33);
		 * myScale(0.66);
		 * myScale(1);   // last color
		 *
		 * // 使用調色盤
		 * const palette = chroma.bezier([
		 *   chroma('darkblue'),
		 *   chroma('#3182bd'),
		 *   chroma('#6baed6'),
		 *   chroma('#b3d4f0'),
		 *   chroma('white')
		 * ]);
		 * ```
		 */
		bezier: typeof bezier
	}
}

export interface IBezier
{
	(t: number): Color,

	scale(): IScale
}

/**
 * Returns a function that
 * [bezier-interpolates]{@link https://www.vis4.net/blog/posts/mastering-multi-hued-color-scales/} between
 * colors in Lab space. The input range of the function is [0..1].
 * You can convert it to a scale instance by calling <code>chroma.bezier(...).scale()</code>
 */
function bezier(colors: (string | Color)[]): IBezier
{
	const f = _bezier(colors);
	f.scale = () => scale(f as any);
	return f;
}

export default bezier
