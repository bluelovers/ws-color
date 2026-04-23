/**
 * 顏色定義模組 / Color Definition Module
 *
 * 提供基礎顏色名稱與顏色值的類型定義。
 * Provides basic color name and color value type definitions.
 *
 * @module colors/index
 */

/**
 * 基礎顏色名稱介面 / Basic color names interface
 *
 * 定義系統使用的特殊顏色名稱：
 * - transparent: 透明色（alpha 為 0）
 * - _default: 預設背景色（#ffffff 白色）
 * - _empty: 空色（alpha 為 1，作為遮罩使用）
 *
 * Defines special color names used by the system:
 * - transparent: Transparent color (alpha = 0)
 * - _empty: Empty color (alpha = 1, used as mask)
 * - _default: Default background color (#ffffff white)
 */
export interface IColorNames
{
	/** 透明色（alpha 為 0）/ Transparent color (alpha = 0) */
	transparent: [null, null, null, 0],
	/** 預設背景色 / Default background color */
	_default: string,
	/** 空色（alpha 為 1，作為遮罩使用）/ Empty color (alpha = 1, used as mask) */
	_empty: [null, null, null, 1],
}

/**
 * 模组扩展 / Module augmentation
 *
 * 将 IColorNames 扩展到 chroma 介面，使 chroma.colors 可用。
 * Extends IColorNames to chroma interface, enabling chroma.colors.
 */
declare module '../chroma'
{
	interface chroma
	{
		colors: IColorNames
	}
}

/**
 * 顏色名稱常數物件 / Color names constant object
 *
 * 包含系統預設的基礎顏色值。
 * Contains system default base color values.
 */
const colors: IColorNames = {
	transparent: [null, null, null, 0],
	_default: "#ffffff",
	_empty: [null, null, null, 1],
} as any

export default colors
