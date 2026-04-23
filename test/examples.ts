/**
 * Colord 顏色範例程式
 * Colord Color Examples
 *
 * 此檔案展示僅使用 colord 的顏色處理功能
 * （不含 colord-rand-loop 套件依賴）
 *
 * @module colord-examples-stand-alone
 */
import { colord } from 'colord';

// ============================================================================
// 工具函數：均勻色盤
// ============================================================================

/**
 * 生成分佈均勻的色盤
 * Generate evenly distributed palette
 *
 * 演算法：將色相環從基準顏色開始，均勻劃分為 count 等份
 *
 * @param baseColor - 基準顏色
 * @param count - 分割數量
 * @returns 色盤陣列
 *
 * @example
 * createEvenPalette('#FF0000', 5)
 * // 產生 5 個在色相環上均勻分佈的顏色
 */
function createEvenPalette(baseColor: string, count: number): string[]
{
	const base = colord(baseColor);
	const palette: string[] = [];

	for (let i = 0; i < count; i++)
	{
		// (i / count) * 360 確保均勻分佈在 0-360 度
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
 * 1. 旋轉色相 ±40度 (保持色相近似性)
 * 2. 調整亮度 ±10% (保持視覺和諧)
 *
 * 這不是完全隨機的顏色，而是與基準顏色保持視覺關聯
 *
 * @param baseColor - 基準顏色
 * @returns 相近的隨機顏色
 */
function createSimilarColor(baseColor: string): string
{
	const base = colord(baseColor);

	// 色相偏移 ±40度
	const rotateDeg = (Math.random() - 0.5) * 80;

	// 亮度調整 ±10%
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

	return newColor.toHex();
}

// ============================================================================
// 範例：相近色
// ============================================================================

/**
 * 範例：從基準顏色生成多個相近色
 * Example: Generate multiple similar colors from base
 *
 * 每個產生的顏色都與基準保持視覺關聯
 */
function example_SimilarColors()
{
	console.log('\n=== 範例：相近顏色 ===');

	const baseColor = '#FF0000';

	console.log(`  基準: ${baseColor}`);
	console.log(`  相近色:`);

	// 生成 10 個相近色
	for (let i = 0; i < 10; i++)
	{
		const similar = createSimilarColor(baseColor);
		console.log(`  [${i}] ${similar}`);
	}
}

// ============================================================================
// 範例：均勻色盤
// ============================================================================

/**
 * 範例：生成均勻分佈的色相環色盤
 * Example: Generate evenly distributed hue circle palette
 */
function example_EvenPalette()
{
	console.log('\n=== 範例：均勻色盤 ===');

	const baseColor = '#FF5500';

	// 產生 5 個均勻分佈的顏色
	const palette = createEvenPalette(baseColor, 5);

	console.log(`  基準: ${baseColor}`);
	console.log(`  色盤:`);

	palette.forEach((c, i) =>
	{
		console.log(`  [${i}] ${c}`);
	});
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
	console.log('║  Colord 顏色範例展示                   ║');
	console.log('╚══════════════════════════════════════╝');

	example_SimilarColors();
	example_EvenPalette();

	console.log('\n✓ 所有範例執行完成');
}

// 執行
main();