
import Color from '../Color';
import rand, { randomHex, IOptionsRand } from '../utils/rand';
import chroma from '../chroma';

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Returns a random color.
		 * 回傳隨機色彩
		 * @param options - 選項配置 / Options configuration
		 * @returns 隨機色彩 / Random color
		 * @example
		 * ```typescript
		 * // 取得完全隨機的色彩
		 * const color = chroma.random();
		 * // returns a random hex color like '#a3f5c2'
		 *
		 * // 限制在特定 RGBA 範圍內
		 * const warmColor = chroma.random({ alpha: 0.5 });
		 * // returns random color with 50% opacity
		 *
		 * // 使用 rand 別名
		 * const randomColor = chroma.rand();
		 * ```
		 * @example
		 * ```typescript
		 * // 在迴圈中生成多個隨機色彩
		 * const colors = Array.from({ length: 5 }, () => chroma.random());
		 * // returns array of 5 random colors
		 *
		 * // 限制色彩範圍 (HSL 色彩空間)
		 * const saturations = [0.5, 1]; // [min, max]
		 * const hues = [0, 360]; // full spectrum
		 * ```
		 */
		random(options?: IOptionsRand | IOptionsRand["rgba"]): Color
		rand(options?: IOptionsRand | IOptionsRand["rgba"]): Color
	}
}

export function random(options?: IOptionsRand | IOptionsRand["rgba"])
{
	if (options instanceof Color || Array.isArray(options) || typeof options === 'string' || typeof options !== 'object')
	{
		// @ts-ignore
		options = {
			rgba: options,
		}
	}

	// @ts-ignore
	if (options?.rgba)
	{
		return new Color(rand(options), 'rgba');
	}

	let code = '#' + randomHex(options);
	return new Color(code, 'hex');
}

chroma.random = chroma.rand = random;

export default random
