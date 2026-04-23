/**
 * 色彩空間類型定義
 * Color space type definitions
 *
 * 定義所有支援的色彩空間及其數據結構
 * Defines all supported color spaces and their data structures
 */
import Color from './Color';

/**
 * 色彩空間映射介面
 * Color space mapping interface
 *
 * 儲存顏色在不同色彩空間中的表示形式
 * Stores color representations in different color spaces
 * 用於色彩轉換和查詢 / Used for color conversion and queries
 */
export interface IColorSpaces {
	rgb: [number, number, number];
	rgba: [number, number, number, number];
	hcg: [number, number, number];
	hsl: [number, number, number, number?];
	hsla: [number, number, number, number];
	hsv: [number, number, number];
	hsi: [number, number, number];
	lab: [number, number, number];
	lch: [number, number, number];
	lrgb: [number, number, number, number];
	hcl: [number, number, number];
	cmyk: [number, number, number, number];
	gl: [number, number, number, number];
}

/**
 * 插值模式類型
 * Interpolation mode type
 *
 * 指定色彩插值時使用的色彩空間
 * Specifies the color space used for color interpolation
 * 影響漸層效果的計算方式 / Affects how gradient effects are calculated
 */
export type IInterpolationMode = "rgb" | "hsl" | "hsv" | "hsi" | "lab" | "lch" | "hcl" | "lrgb" | keyof IColorSpaces;

/**
 * 色彩比例尺介面
 * Color scale interface
 *
 * 創建連續色彩比例尺的工具（從輸入範圍映射到輸出顏色）
 * Tool for creating continuous color scales (maps input range to output colors)
 * 常用於資料視覺化的色彩映射 / Commonly used for data visualization color mapping
 */
export interface IScale<OutType = Color>
{
	(c: string[]): IScale;

	(value: number): OutType;

	domain(d?: number[], n?: number, mode?: string): this;

	mode(mode: IInterpolationMode): this;

	gamma(g: number): this;

	cache(use: boolean): boolean;

	correctLightness(enable?: boolean): this;

	padding(p: number | number[]): this;

	/**
	 * 取得比例尺中的顏色
	 * Get colors from the scale
	 *
	 * 可以呼叫 scale.colors(n) 快速取得 n 等分的顏色
	 * 若無參數則回傳原始顏色陣列
	 * Can call scale.colors(n) to quickly grab n equi-distant colors from a color scale.
	 * If called with no arguments, scale.colors returns the original array of colors used to create the scale.
	 * @param c - 取得顏色數量 / Number of colors to retrieve
	 * @param format - 輸出格式 / Output format
	 */
	colors(c: number | undefined,
		format: undefined | null | 'alpha' | 'darken' | 'brighten' | 'saturate' | 'desaturate',
	): Color[];

	colors(c: number | undefined, format: 'luminance' | 'temperature'): number[];

	colors<K extends keyof IColorSpaces>(c: number | undefined, format: K): Array<IColorSpaces[K]>;

	colors(c: number | undefined, format?: 'hex' | 'name'): string[];

	/**
	 * 將比例尺分割為離散類別
	 * Divide scale into discrete classes
	 *
	 * 若要讓比例尺輸出離散顏色而非連續漸層，可使用 classes
	 * 傳入數字則分割為等距類別，或傳入自定義斷点陣列
	 * If you want the scale function to return a distinct set of colors instead of a continuous gradient, you can
	 * use scale.classes. If you pass a number the scale will broken into equi-distant classes.
	 * You can also define custom class breaks by passing them as array
	 * @param c - 類別數量或自定義斷点 / Number of classes or custom breaks
	 */
	classes(c: number | number[]): this;

	/**
	 * 設定輸出格式
	 * Set output format
	 *
	 * 設定 scale() 呼叫時的回傳格式
	 * 傳入 null 則輸出顏色物件
	 * Set out format for scale() call. Passing null will result in a scale which outputs colors.
	 * @param format - 輸出格式 / Output format
	 */
	out(format: null): IScale;

	out<K extends keyof IColorSpaces>(format: K): IScale<IColorSpaces[K]>;

	out(format: 'hex'): IScale<string>;
}

/**
 * Cubehelix 色彩生成器介面
 * Cubehelix color generator interface
 *
 * 實現 Cubehelix 色彩空間生成演算法
 * Implements Cubehelix color space generation algorithm
 * 適合科學資料視覺化，提供良好的亮度感知 / Suitable for scientific data visualization with good perceived luminance
 */
export interface ICubehelix
{
	/**
	 * 取得或設定色相旋轉起始角度
	 * Get or set hue rotation start angle
	 * @default 300
	 */
	start(): number;

	start(s: number): ICubehelix;

	/**
	 * 取得或設定色相旋轉圈數和方向
	 * Get or set number (and direction) of hue rotations
	 * @default -1.5
	 */
	rotations(): number;

	rotations(r: number): ICubehelix;

	/**
	 * 取得或設定伽馬校正因子
	 * Get or set gamma correction factor
	 * 可用於強調低或高強度值 / Can be used to emphasise low or high intensity values
	 * @default 1
	 */
	gamma(): number;

	gamma(g: number): ICubehelix;

	/**
	 * 取得或設定亮度範圍
	 * Get or set lightness range
	 * @default [0, 1] (black -> white)
	 */
	lightness(): number;

	lightness(l: number[]): ICubehelix;

	/**
	 * 取得色彩比例尺介面
	 * Get color scale interface
	 * 透過 chroma.scale 介面使用 cube-helix
	 * You can call cubehelix.scale() to use the cube-helix through the chroma.scale interface.
	 */
	scale(): IScale;

	hue(): number;

	hue(hue: number | [number, number]): ICubehelix
}



/**
 * RGB 色彩表示介面
 * RGB color representation interface
 *
 * RGB 色彩空間的元組類型定義
 * Tuple type definition for RGB color space
 * 支援紅、綠、藍三通道及選用的 Alpha 通道
 * Supports red, green, blue channels and optional alpha channel
 */
export interface IRGB extends Array<number>
{
	0: number,
	1: number,
	2: number,
	3?: number,
	_clipped?: boolean,
	_unclipped?: number[],
}

/**
 * RGB 色彩值類型
 * RGB color value type
 *
 * 可接受多種 RGB 色彩表示形式
 * Accepts multiple RGB color representation forms
 * 用於色彩解析時的靈活輸入 / Used for flexible input when parsing colors
 */
export type IRGBValue = IRGB | IColorSpaces["rgba"] | IColorSpaces["rgb"] | number[];
