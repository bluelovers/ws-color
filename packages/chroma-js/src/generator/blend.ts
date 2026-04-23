/*
 * interpolates between a set of colors uzing a bezier spline
 * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
 */

import '../io/rgb';
import chroma from '../chroma';
import Color from '../Color';
import { IRGB } from '../types';

export type IBlendMode = 'multiply' | 'darken' | 'lighten' | 'screen' | 'overlay' | 'burn' | 'dodge'

/**
 * Blends two colors using RGB channel-wise blend functions.
 * 使用 RGB 通道混合函式混合兩個色彩。
 *
 * @param bottom - 底層色彩 / Bottom color
 * @param top - 頂層色彩 / Top color
 * @param mode - 混合模式 / Blend mode
 * @returns 混合後的色彩 / Blended color
 * @example
 * ```typescript
 * // 基本混合模式
 * chroma.blend('red', 'blue', 'multiply');
 * // returns darker color (multiply blend)
 *
 * chroma.blend('#ff0000', '#0000ff', 'screen');
 * // returns lighter color (screen blend)
 *
 * // 其他混合模式
 * chroma.blend('white', 'black', 'darken');  // returns black
 * chroma.blend('white', 'black', 'lighten');  // returns white
 * chroma.blend('white', 'black', 'overlay');  // returns gray
 * chroma.blend('white', 'black', 'burn');    // returns black
 * chroma.blend('white', 'black', 'dodge');    // returns white
 * ```
 * @example
 * ```typescript
 * // 使用 Color 物件
 * const color1 = chroma('red');
 * const color2 = chroma('blue');
 * chroma.blend(color1, color2, 'multiply');
 *
 * // 在迴圈中混合多個色彩
 * const layers = ['red', 'orange', 'yellow', 'green', 'blue'];
 * let result = 'white';
 * for (const color of layers)
 * {
 *   result = chroma.blend(result, color, 'multiply');
 * }
 * ```
 */
export function blend(bottom: string | Color, top: string | Color, mode: IBlendMode)
{
	if (!blend[mode])
	{
		throw new Error('unknown blend mode ' + mode);
	}
	return blend[mode](bottom, top);
}

export interface blend extends Record<IBlendMode, (bottom: string | Color, top: string | Color) => Color>
{

}

function blend_f(f: (a: IRGB, b: IRGB) => IRGB)
{
	return (bottom: string | Color, top: string | Color) =>
	{
		const c0 = chroma(top).rgb();
		const c1 = chroma(bottom).rgb();
		return chroma.rgb(f(c0, c1));
	};
}

function each(f: (a: number, b?: number) => number)
{
	return (c0: IRGB, c1: IRGB) =>
	{
		const out: IRGB = [
			f(c0[0], c1[0]),
			f(c0[1], c1[1]),
			f(c0[2], c1[2]),
		]
		return out;
	};
}

const normal = (a: number) => a
const multiply = (a: number, b: number) => a * b / 255
const darken = (a: number, b: number) => a > b ? b : a
const lighten = (a: number, b: number) => a > b ? a : b
const screen = (a: number, b: number) => 255 * (1 - (1 - a / 255) * (1 - b / 255))
const overlay = (a: number, b: number) => b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255) * (1 - b / 255))
const burn = (a: number, b: number) => 255 * (1 - (1 - b / 255) / (a / 255))
const dodge = (a: number, b: number) =>
{
	if (a === 255) return 255;
	a = 255 * (b / 255) / (1 - a / 255);
	return a > 255 ? 255 : a
}

// # add = (a,b) ->
// #     if (a + b > 255) then 255 else a + b

blend.normal = blend_f(each(normal));
blend.multiply = blend_f(each(multiply));
blend.screen = blend_f(each(screen));
blend.overlay = blend_f(each(overlay));
blend.darken = blend_f(each(darken));
blend.lighten = blend_f(each(lighten));
blend.dodge = blend_f(each(dodge));
blend.burn = blend_f(each(burn));
// blend.add = blend_f(each(add));

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Blends two colors using RGB channel-wise blend functions.
		 * 使用 RGB 通道混合函式混合兩個色彩。
		 */
		blend: typeof blend
	}
}

export default blend;
