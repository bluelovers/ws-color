/**
 * 循環顏色生成器
 * Loop Colors Generator
 *
 * 提供顏色陣列的循環迭代功能，支援隨機順序與自定義生成器。
 * Provides circular iteration over color arrays with random order and custom generator support.
 *
 * @module loop-colors
 */
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';

/**
 * CSS 預設顏色列表
 * Default CSS color palette
 *
 * 包含 7 種基本顏色的十六進位色碼。
 * Contains 7 basic color hex codes.
 *
 * @returns 只讀顏色陣列 / Readonly color array
 */
export function cssColors()
{
	return [
		'#906',
		'#66F',
		'#800',
		'#C60',
		'#EAEA00',
		'#006',
		'#360',
	] as const;
}

/**
 * CLI 終端機顏色類型
 * CLI terminal color type
 *
 * 終端機可用的標準顏色名稱。
 * Standard color names available in terminal.
 */
export type ICliColor = "cyan" | "magenta" | "blue" | "yellow" | "green" | "red";

/**
 * CLI 終端機顏色列表
 * CLI terminal color list
 *
 * @returns 終端機顏色名稱陣列 / Array of terminal color names
 */
export function cliColors(): ICliColor[]
{
	return ["cyan", "magenta", "blue", "yellow", "green", "red"];
}

/**
 * 循環顏色生成器選項
 * Loop colors generator options
 *
 * @typeParam T - 輸入顏色類型 / Input color type
 * @typeParam R - 輸出類型 / Output type
 */
export interface IOptions<T = string, R = T>
{
	/** 隨機函式或是否啟用隨機 / Random function or enable flag */
	rand?: ((index?: number, length?: number, ...argv: any[]) => number) | boolean;
	/** 生成上限次數，-1 表示無限制 / Generation limit, -1 means unlimited */
	limit?: number | -1;
	/**
	 * 自定義生成器函式
	 * Custom generator function
	 *
	 * @param colors - 顏色陣列 / Color array
	 * @param position - 當前位置 / Current position
	 * @param idx - 當前索引 / Current index
	 * @param len - 陣列長度 / Array length
	 * @returns 處理後的結果 / Processed result
	 */
	generator?(colors: readonly T[], position: number, idx: number, len: number): R
}

/**
 * 建立循環顏色生成器
 * Create loop colors generator
 *
 * 創建一個可迭代的顏色生成器，支援：
 * - 順序或隨機循環遍歷顏色
 * - 自定義生成器處理邏輯
 * - 可設定生成上限次數
 *
 * Creates an iterable color generator supporting:
 * - Sequential or random circular traversal
 * - Custom generator processing logic
 * - Configurable generation limit
 *
 * @typeParam T - 輸入顏色類型 / Input color type
 * @typeParam R - 輸出類型 / Output type
 * @param colors - 顏色陣列 / Color array
 * @param options - 選項配置 / Options configuration
 * @returns  Generator 函式，回傳可迭代物件 / Generator function returning iterable
 *
 * @example
 * ```typescript
 * // 基本順序循環 / Basic sequential loop
 * const gen = loopColors(['#FF0000', '#00FF00', '#0000FF']);
 * console.log(gen().next().value); // '#FF0000'
 *
 * // 隨機循環 / Random loop
 * const randGen = loopColors(['#FF0000', '#00FF00'], { rand: true });
 *
 * // 自定義生成器 / Custom generator
 * const upperGen = loopColors(['red', 'blue'], {
 *   generator: (colors, pos) => colors[pos].toUpperCase()
 * });
 * ```
 */
export function loopColors<T, R = T>(colors: ITSArrayListMaybeReadonly<T>, options?: IOptions<T, R>)
{
	options ??= {};

	colors = colors.slice();

	let idx = 0;
	const len = colors.length;
	// @ts-ignore
	let getIndex = (index: number, length: number) => idx++ % len;

	if (options.rand)
	{
		const rand = options.rand === true ? Math.random : options.rand;

		const _ = getIndex;
		getIndex = (index: number, length: number) =>
		{
			idx = Math.floor(length * rand(index, length));
			return _(idx, length);
		};
	}

	let limit = options.limit | 0;
	limit = limit > 0 ? limit : Infinity;

	// @ts-ignore
	const generator: IOptions<T, R>["generator"] = options.generator ?? ((colors, position) => colors[position]);

	return function* (startIndex?: number): Generator<R, undefined, R>
	{
		if (typeof startIndex !== 'undefined')
		{
			startIndex |= 0;
			idx = startIndex >= 0 ? startIndex : idx;
		}
		else
		{
			idx = 0;
		}

		do
		{
			yield generator(colors, getIndex(idx, len), idx, len);
		}
		while (--limit > 0);

		return
	};
}

export default loopColors;