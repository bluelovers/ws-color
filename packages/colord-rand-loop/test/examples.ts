/**
 * Colord Rand Loop 範例程式
 * Colord Rand Loop Examples
 *
 * 展示 colord-rand-loop 套件的功能：
 * 1. 基於給定的顏色來隨機生成相近顏色
 * 2. 在給定的顏色用完之後，才開始生成相似色
 *
 * @module colord-rand-loop-examples
 */
import { colord, Colord } from 'colord';
import { IOptions, loopColors } from 'loop-colors';
import { colordRandLoop, IColorInput, IOptionsColordRandLoop } from '../src/index';
import { _generateStartToEnd, _generateStartToEndForStringArray } from './lib/_run';
import { paletteLazyHex } from '@lazy-color/palette-lazy';

// ============================================================================
// 工具函數：基礎色盤生成
// ============================================================================

/**
 * 生成分佈均勻的色盤
 * Generate evenly distributed palette
 *
 * 演算法：將基準顏色的色相環均勻劃分為 count 等份
 * Algorithm: Divide the hue circle into equal parts from base color
 *
 * @param baseColor - 基準顏色（會在色相環上均勻分佈）
 * @param count - 生成數量（將色相環分成多少等份）
 * @returns 色盤陣列
 *
 * @example
 * createEvenPalette('#FF0000', 5)
 * // => ['#ff0000', '#4dff00', '#004dff', '#00ff4d', '#ff004d']
 */
function createEvenPalette(baseColor: string, count: number): string[]
{
	const base = colord(baseColor);
	const palette: string[] = [];

	for (let i = 0; i < count; i++)
	{
		// (i / count) * 360 確保均勻分佈在 0-360 度之間
		const rotated = base.rotate((i / count) * 360);
		palette.push(rotated.toHex());
	}

	return palette;
}

// ============================================================================
// 工具函數：相近色生成
// ============================================================================

/**
 * 從基準顏色生成隨機相近色
 * Generate random similar color from base
 *
 * 演算法：
 * 1. 旋轉色相：隨機偏移 ±40度 (rotateDeg = (random - 0.5) * 80)
 * 2. 調整亮度：隨機調整 ±10% (lightenAmount = (random - 0.5) * 0.2)
 *
 * 這種方式產生的顏色與基準顏色保持視覺上的關聯性，
 * 不會看起來完全無關。
 *
 * @param baseColor - 基準顏色
 * @returns 相近的隨機顏色
 */
function createSimilarColor(baseColor: IColorInput)
{
	const base = colord(baseColor);

	// 随机旋轉色相 (±40度)
	const rotateDeg = (Math.random() - 0.5) * 80;
	// 随机調整亮度 (±10%)
	const lightenAmount = (Math.random() - 0.5) * 0.2;

	let newColor = base.rotate(rotateDeg);

	if (lightenAmount > 0)
	{
		newColor = newColor.lighten(lightenAmount);
	}
	else
	{
		newColor = newColor.darken(Math.abs(lightenAmount));
	}

	return newColor;
}

// ============================================================================
// 工具函數：耗盡後生成
// ============================================================================

/**
 * 創建「用完後生成」模式的生成器
 * Create "generate after exhausted" mode generator
 *
 * 演算法：
 * 1. idx < colors.length 時：直接返回預設顏色
 * 2. idx >= colors.length 時：
 *    - 從最後一個預設顏色開始
 *    - 隨機旋轉 ±60度
 *    - 隨機調整亮度 ±15%
 *
 * @param initialColors - 初始預設顏色陣列
 * @returns 可用於 loopColors 的 generator 函數
 */
function createExhaustGenerator(): IOptions<string, Colord>['generator']
{
	return (colors, position, idx) =>
	{
		if (idx < colors.length)
		{
			// 第一輪：直接使用初始顏色
			return colord(colors[idx]);
		}
		else
		{
			/** 初始顏色用完了，開始產生變化 */
			const lastBase = colord(colors[position]);

			return lastBase
				.rotate((Math.random() - 0.5) * 120)
				.lighten(Math.random() * 0.3 - 0.15);
		}
	};
}

// ============================================================================
// 工具函數：動態色盤（第二輪開始變化）
// ============================================================================

/**
 * 創建動態色盤生成器（第一輪預設，第二輪開始變化）
 * Create dynamic palette generator (default first round, varying second round)
 *
 * 演算法：
 * 1. idx < colors.length 時：直接返回預設色盤中的顏色
 * 2. idx >= colors.length 時：
 *    - 從預設顏色中循環選擇一個
 *    - 旋轉 ±30度
 *    - 調整亮度 ±15%
 *
 * @param palette - 預設色盤（第一輪使用）
 * @returns 可用於 loopColors 的 generator 函數
 */
function createDynamicPaletteGenerator(): IOptions<string, Colord>['generator']
{
	return (colors, position, idx) =>
	{
		if (idx < colors.length)
		{
			// 第一輪：直接使用預設顏色
			return colord(colors[idx]);
		}
		else
		{
			// 第二輪：開始產生變化
			// 使用 idx % colors.length 循環選擇基礎色
			const baseColor = colors[idx % colors.length];
			const base = colord(baseColor);

			return base
				.rotate((Math.random() - 0.5) * 60)
				.lighten(Math.random() * 0.3 - 0.15);
		}
	};
}

/**
 * 範例 3：生成相近顏色
 * Example 3: Generate similar colors
 *
 * 使用 createSimilarColor 函数为每个基础色生成随机相近色
 */
function example3_SimilarColorsWithLoop()
{
	console.log('\n=== 範例 3：相近顏色 ===');

	const baseColors = paletteLazyHex.antdTags;

	// 使用自定義生成器
	const gen = loopColors(baseColors, {
		rand: true,
		generator: (colors, position, idx) =>
		{
			return createSimilarColor(colors[position]);
		},
	})();

	_generateStartToEnd(0, baseColors.length * 2, gen);
}

/**
 * 範例 5：在給定的顏色用完後才生成新顏色
 * Example 5: Generate new colors after exhausted
 *
 * 使用 createExhaustGenerator 工具函數
 */
function example5_ExhaustThenGenerate()
{
	console.log('\n=== 範例 5：顏色用完後生成新顏色 ===');

	const initialColors = paletteLazyHex.antdTags;
	const generator = createExhaustGenerator();

	const gen = loopColors(initialColors, {
		generator,
	})();

	console.log(`  --- 第一輪：使用初始顏色 (${initialColors.length}個) ---`);
	_generateStartToEnd(0, initialColors.length, gen);

	console.log('  --- 第二輪：生成新顏色 ---');
	_generateStartToEnd(0, initialColors.length * 2, gen);
}

/**
 * 範例 6：動態色盤（第二輪開始變化）
 * Example 6: Dynamic palette (varying second round)
 */
function example6_EvenPaletteWithLoop()
{
	console.log('\n=== 範例 6：均勻色盤 ===');

	const baseColor = paletteLazyHex.antdTags[0];
	const colors = createEvenPalette(baseColor, 5);

	// ---------- 版本 1：靜態色盤 ----------
	// console.log('\n[版本 1] 靜態色盤:');
	// const gen1 = loopColors(colors, {})();

	// _generateStartToEndForStringArray(0, 10, gen1);

	// ---------- 版本 2：動態色盤 ----------
	console.log('\n[版本 2] 動態色盤（第二輪開始變化）:');

	const generator = createDynamicPaletteGenerator();
	const gen2 = loopColors(colors, {
		generator,
	})();

	console.log(`  --- 第一輪：使用預設顏色 (${colors.length}個) ---`);
	_generateStartToEnd(0, colors.length, gen2);

	console.log('  --- 第二輪：開始變化 ---');
	_generateStartToEnd(0, colors.length * 2, gen2);
}

// ============================================================================
// 主程式
// ============================================================================

/**
 * 執行所有範例
 */
function main()
{
	console.log('╔══════════════════════════════════════╗');
	console.log('║  Colord Rand Loop 範例展示            ║');
	console.log('╚══════════════════════════════════════╝');

	example3_SimilarColorsWithLoop();

	example5_ExhaustThenGenerate();
	example6_EvenPaletteWithLoop();

	console.log('\n✓ 所有範例執行完成');
}

// 執行
main();

