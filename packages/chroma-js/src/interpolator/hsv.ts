import '../io/hsv';
import interpolate_hsx from './_hsx';

/**
 * HSV 插值 - 在 HSV 色彩空間中進行插值
 * HSV color space interpolation - interpolates in HSV color space
 *
 * 說明：HSV (Hue, Saturation, Value) 也稱為 HSB
 * Explanation: HSV (Hue, Saturation, Value) also known as HSB
 *
 * 為什麼使用 HSV：
 * - 保持色相的連續性，避免跨過 0/360 度時的問題
 * - Value (明度) 維度在 RGB 黑色時為 0
 * - 適合需要保持色彩鮮豔度的漸層
 *
 * HSV 與 HSL 的差異：
 * - HSV 的 V (Value) 表示純色在 RGB 中的最大通道值
 * - HSL 的 L (Lightness) 表示 RGB 的平均值
 * - 當 L=0 或 L=1 時兩者相同，但中間值時色彩表現不同
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
const hsv = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hsv');
}

declare module './index'
{
	interface IInterpolator
	{
		hsv(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hsv = hsv;

export default hsv;
