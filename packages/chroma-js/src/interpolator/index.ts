import Color from '../Color';
import { IColorSpaces } from '../types';

/**
 * 插值器介面 - 定義顏色插值的函式簽章
 * Interpolator interface - defines function signature for color interpolation
 *
 * @interface IInterpolator
 * @property [fn] - 插值函式，參數為兩個顏色和插值因子（可選）/ Interpolation function taking two colors and optional interpolation factor
 */
export interface IInterpolator
{
	[fn: string]: (col1: Color, col2: Color, f?: number) => Color
}

/**
 * 插值模式類型 - 所有可用的插值方法名稱
 * Interpolator mode type - all available interpolation method names
 *
 * @type IInterpolatorMode
 */
export type IInterpolatorMode = keyof IInterpolator

export default {} as IInterpolator;
