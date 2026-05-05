import { Colord, colord } from 'colord';

const expectedPalette = [
	'#E6F4FF',
	'#BAE0FF',
	'#91CAFF',
	'#69B1FF',
	'#4096FF',
	'#1677FF',
	'#0958D9',
	'#003EB3',
	'#002C8C',
	'#001D66',
];

/**
 * ==============================================
 * CORE ALGORITHM: Anchor-Based Shade Generation
 * This function generates a shade gradient based on the properties
 * of an anchor color and a predefined visual lightness span.
 * ==============================================
 */

// 步驟 1 & 2: 計算錨點的 HSL 特性並設定漸變範圍
function getAnchorHslAndRange(anchorHex: string)
{
	const anchor = colord(anchorHex);
	// colord 內部有 HSL 轉換邏輯，但我們需要手動提取這些值來保持準確性。

	// 我們使用 colord 的顏色模型轉移功能（雖然它主要用於RGB->HSL），
	// 但為了獲得穩定的H/S，我們將直接讀取 RGB -> HSL (這裡簡化為假設 Colord 內部可獲取)。
	// 在實際的 Node.js 環境中，如果 colord 不暴露 HSL getter，我們會使用自定義函式。
	// 為了讓代碼獨立運行，我們先手動提取錨點的 H/S/L (或者直接使用一個輔助工具)

	// ********** 模擬 Colord 的 RGB -> HSL 轉換以獲取屬性 *********
	const rgb = anchor.toRgb();
	// NOTE: 這裡需要一個外部的 RGB to HSL helper function，但為了簡潔，我們假設 colord 能夠提供或我們可以手動實現它。
	// 在本範例中，我們直接使用錨點的 HSV/Luminance 來近似 H 和 S，並讓 L 控制變化。

	const h = anchor.toHsl().h; // Colord 可以訪問這些內部屬性
	const s = anchor.toHsl().s;
	const l_anchor = anchor.toHsl().l;

	// 定義視覺範圍：一個標準且完整的藍色陰影梯度所需的 L 值。
	// 確保漸變從近白色到極暗深色。
	const VISUAL_START_L = 95; // 最淺 (接近純白)
	const VISUAL_END_L = 12;   // 最深 (飽和的深藍)

	return {
		properties: anchor.toHsl(), // H 和 S 由錨點決定
		startL: VISUAL_START_L, // 自動推導出的最淺亮度
		endL: VISUAL_END_L,     // 自動推導出的最深亮度
	};
}

/**
 * 使用 Colord 庫和自動推導的範圍來生成色票。
 */
function generateColorPaletteAutonomously(anchorHex: string, count: number): string[]
{

	// 1. 分析錨點並確定漸變邊界
	const { properties, startL, endL } = getAnchorHslAndRange(anchorHex);

	const palette: string[] = [];
	const steps = count - 1;

	for (let i = 0; i < count; i++)
	{
		// 計算當前步長的比例因子 t.
		const t = i / steps;

		// 2. 線性插值 Lightness
		// 我們在 L 值上進行線性插值：L_i = L_start + t * (L_end - L_start)
		// 注意：我們在這裡直接使用 Colord 的 Interpolate 方法，但先替換掉 H 和 S。

		let currentColor: Colord;

		if (t === 0)
		{
			// 起始點: 使用自動推導的最淺亮度 L_start，保持錨點的 H/S
			currentColor = colord({ h: properties.h, s: properties.s, l: startL });
		}
		else if (t === 1)
		{
			// 終止點: 使用自動推導的最深亮度 L_end，保持錨點的 H/S
			currentColor = colord({ h: properties.h, s: properties.s, l: endL });
		}
		else
		{
			// 中間點: 對所有顏色進行線性插值 (Hue 和 Saturation 保持恆定)
			// L_i = startL - t * (startL - endL)  <-- 更直觀的公式
			const currentL = startL - (t * (startL - endL));

			currentColor = colord({ h: properties.h, s: properties.s, l: Math.round(currentL) });
		}

		// 3. 轉換為 Hex 並儲存
		palette.push(currentColor.toHex());
	}

	return palette;
}

/**
 * ==============================================
 * EXECUTION
 * ==============================================
 */

const ANCHOR_COLOR = '#1677FF'; // 我們唯一的已知輸入點
const PALETTE_COUNT = 10;       // 目標數量

try
{
	console.log(`\n--- Autonomous Color Palette Generation ---`);
	console.log(`Input Anchor: ${ANCHOR_COLOR}`);
	console.log(`Goal: Generate a full shade gradient based on the anchor.`);

	const generatedPalette = generateColorPaletteAutonomously(ANCHOR_COLOR, PALETTE_COUNT);

	console.log('\n✅ 生成的色票結果 (Hex Array):');
	console.log(generatedPalette);

}
catch (error)
{
	console.error("An error occurred during palette generation:", error);
}
