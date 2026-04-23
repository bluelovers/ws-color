/**
 * 顏色類型定義
 * Color Type Definitions
 *
 * 提供顏色資料結構的 TypeScript 類型定義，用於 RGB 色彩表示。
 * Defines TypeScript type interfaces for color data structures, representing RGB colors.
 */
/**
 * 調色盤記錄類型
 * Color palette record type
 *
 * 以色彩名稱為鍵、顏色字串陣列為值的記錄類型
 * Record type with color name as key and color string array as value
 *
 * @typeParam K - 鍵類型，預設為字串 / Key type, default is string
 * @example
 * ```typescript
 * // 建立調色盤記錄
 * const palette: IColorPaletteRecord = {
 *   primary: ['#ff0000', '#00ff00', '#0000ff'],
 *   secondary: ['#ffff00', '#00ffff', '#ff00ff'],
 * };
 * ```
 */
export type IColorPaletteRecord<K extends string = string> = Record<K, string[]>;
/**
 * RGB 色彩陣列類型
 * RGB color array type
 *
 * 包含紅、綠、藍三個顏色分量，可選的 Alpha 分量
 * Contains red, green, blue color components, optional alpha
 *
 * @example
 * ```typescript
 * // 基本 RGB 陣列
 * const rgb: IColorRGBArray = [255, 0, 0]; // 紅色
 *
 * // 帶有 Alpha 的 RGB 陣列
 * const rgba: IColorRGBArray = [255, 0, 0, 0.5]; // 半透明紅色
 * ```
 */
export type IColorRGBArray = readonly [
	r: number,
	g: number,
	b: number,
	/**
	 * 0 ~ 1
	 */
	a?: number
];
export interface IColorRGBObject {
	r: number;
	g: number;
	b: number;
	/**
	 * 0 ~ 1
	 */
	a?: number;
}

export {};
