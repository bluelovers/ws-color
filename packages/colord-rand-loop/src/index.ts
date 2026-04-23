/**
 * Colord 隨機循環顏色生成器
 * Colord Random Loop Color Generator
 *
 * 基於 loop-colors 模組，结合 Colord 庫與隨機顏色工具，
 * 提供具有去重功能的隨機顏色循環生成器。
 *
 * Based on loop-colors module, combined with Colord library and random color utilities,
 * provides a random color loop generator with deduplication functionality.
 *
 * @module colord-rand-loop
 */
import { cssColors, IOptions, loopColors } from 'loop-colors';
import { colord, Colord, random, RgbaColor } from 'colord';
import { _rgbObjectRand, IOptionsRandColorUtil } from '@lazy-color/rand-util';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { AnyColor } from 'colord';

/**
 * 顏色輸入類型
 * Color input type
 *
 * 支援 AnyColor（任意顏色格式）或已初始化的 Colord 實例。
 * Supports AnyColor (any color format) or initialized Colord instance.
 */
export type IColorInput = AnyColor | Colord;

/**
 * Colord 隨機循環選項
 * Colord random loop options
 *
 * @extends IOptions - 循環生成器基礎選項 / Loop generator base options
 * @extends IOptionsRandColorUtil - 隨機顏色工具選項 / Random color utility options
 */
export interface IOptionsColordRandLoop extends IOptions<IColorInput, Colord>, IOptionsRandColorUtil
{
	/** 顏色快取集合，用於去重 / Color cache set for deduplication */
	cache?: Set<string>
	/** 顏色來源陣列 / Color source array */
	colors?: ITSArrayListMaybeReadonly<IColorInput>
}

/**
 * 建立預設生成器
 * Create default generator
 *
 * 創建一個具有去重機制的 Colord 顏色生成器：
 * - 驗證輸入顏色的有效性
 * - 維持已生成顏色的快取集合
 * - 自動迴避重複顏色（最多重試 5 次後清除快取）
 *
 * Creates a Colord color generator with deduplication mechanism:
 * - Validates input color validity
 * - Maintains cache set of generated colors
 * - Automatically avoids duplicate colors (clears cache after max 5 retries)
 *
 * @param options - 生成器選項 / Generator options
 * @param options.cache - 顏色快取集合 / Color cache set
 * @param options.randFn - 自定義隨機函式 / Custom random function
 * @param options... - 傳遞至隨機顏色工具的其他選項 / Other options passed to random color utility
 * @returns 顏色生成器函式 / Color generator function
 */
export function createDefaultGenerator({
	cache,
	...opts
}: IOptionsColordRandLoop)
{
	cache ??= new Set<string>();

	return (colors: ITSArrayListMaybeReadonly<IColorInput>, position: number) =>
	{
		let cc = colord(colors[position]);
		if (!cc.isValid())
		{
			cc = typeof opts.randFn === 'function' ? colord(_rgbObjectRand<RgbaColor>(null, opts)) : random()
		}
		const _rgba = cc.toRgb();

		let e = 0;
		let result = cc;

		while (cache.has(result.toRgbString()))
		{
			if (e > 5)
			{
				cache.clear();
				e = 0;
			}

			result = colord(_rgbObjectRand(_rgba, opts))
			e++;
		}

		cache.add(result.toRgbString());

		return result
	}
}

/**
 * 建立 Colord 隨機循環
 * Create Colord random loop
 *
 * 創建一個配置完成的 Colord 顏色循環生成器工廠。
 * Creates a configured Colord color loop generator factory.
 *
 * @param options - 循環選項 / Loop options
 * @returns 配置完成的 Generator 函式 / Configured Generator function
 */
export function createColordRandLoop(options?: IOptionsColordRandLoop)
{
	let {
		colors,
		cache,
		...opts
	} = {
		...options,
	};
	colors ??= cssColors() as any;
	cache ??= new Set<string>();
	opts.generator ??= createDefaultGenerator({
		cache,
	});

	return loopColors<IColorInput, Colord>(colors, opts)
}

/**
 * Colord 隨機循環顏色生成器
 * Colord random loop color generator
 *
 * 便捷函式，直接從指定索引開始生成隨機顏色。
 * Convenience function to generate random colors starting from specified index.
 *
 * @param startIndex - 起始索引（可選）/ Starting index (optional)
 * @param options - 循環選項（可選）/ Loop options (optional)
 * @returns 可迭代的 Generator / Iterable Generator
 *
 * @example
 * ```typescript
 * const gen = colordRandLoop(0, { cache: new Set() });
 * const color = gen().next().value; // Colord instance
 * ```
 */
export function colordRandLoop(startIndex?: number, options?: IOptionsColordRandLoop)
{
	return createColordRandLoop(options)(startIndex)
}

export default colordRandLoop

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(colordRandLoop, "__esModule", { value: true });

	Object.defineProperty(colordRandLoop, 'colordRandLoop', { value: colordRandLoop });
	Object.defineProperty(colordRandLoop, 'default', { value: colordRandLoop });

	Object.defineProperty(colordRandLoop, 'createDefaultGenerator', { value: createDefaultGenerator });

	Object.defineProperty(colordRandLoop, 'createColordRandLoop', { value: createColordRandLoop });
}