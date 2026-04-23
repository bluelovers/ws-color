/**
 * ColorBrewer 配色模組 / ColorBrewer Color Scheme Module
 *
 * ColorBrewer 是由 Cynthia Brewer 設計的配色方案，最初用於地圖設計，
 * 後被廣泛應用於資料視覺化領域，特別適合離散階梯（discrete steps）顯示。
 *
 * ColorBrewer is a color scheme designed by Cynthia Brewer, originally for cartography,
 * later widely used in data visualization, especially for discrete step displays.
 *
 * 其特點包括：
 * - 預設為離散色階（不適合連續插值）
 * - 每組配色包含 3-12 個等級
 * - 顏色設計考慮了色盲友好性與列印可行性
 *
 * Features:
 * - Designed for discrete scales (not suitable for continuous interpolation)
 * - Each scheme contains 3-12 classes
 * - Colors designed with colorblind accessibility and print feasibility in mind
 *
 * @module colors/colorbrewer
 */

import colorbrewer from '@bluelovers/color-palette/lib/colorbrewer';
import { IColorBrewer } from '@bluelovers/color-palette/lib/colorbrewer';

/** 匯出 ColorBrewer 類型 / Export ColorBrewer type */
export type { IColorBrewer }

/**
 * 模组扩展 / Module augmentation
 *
 * 将 ColorBrewer 扩展到 chroma 介面，使 chroma.brewer 可用。
 * Extends ColorBrewer to chroma interface, enabling chroma.brewer.
 *
 * chroma.brewer 是便利包含在 chroma.js 中的 ColorBrewer 色階映射。
 * chroma.scale 使用這些顏色來建構插值色階。
 *
 * chroma.brewer is a map of ColorBrewer scales included in chroma.js for convenience.
 * chroma.scale uses the colors to construct interpolated scales.
 */
declare module '../chroma'
{
	interface chroma
	{
		/**
		 * ColorBrewer 色階映射 / ColorBrewer scale map
		 *
		 * 便利包含在 chroma.js 中的 ColorBrewer 色階。
		 * 包含 YlOrRd、BuGn、RdYlBu 等經典配色方案。
		 *
		 * ColorBrewer scales conveniently included in chroma.js.
		 * Includes classic schemes like YlOrRd, BuGn, RdYlBu, etc.
		 */
		brewer: IColorBrewer
	}
}

export default colorbrewer;
