import '../io/hsi';
import interpolate_hsx from './_hsx';

/**
 * HSI 插值 - 在 HSI 色彩空間中進行插值
 * HSI color space interpolation - interpolates in HSI color space
 *
 * 說明：HSI (Hue, Saturation, Intensity) 是一種電視系統常用的色彩表示法
 * Explanation: HSI (Hue, Saturation, Intensity) is a TV system commonly used color representation
 *
 * 為什麼使用 HSI：
 * - 更適合處理光强度的場景（如影像處理）
 * - Intensity 直接與光强度相關，而非 RGB 的 gamma 校正值
 * - 在某些情況下可產生比 HSV 更自然的渐層效果
 *
 * HSI 與 HSV 的差異：
 * - HSI 的 Intensity 是線性光强度，與人類視覺感知更接近
 * - HSV 的 Value 是非線性的，與 gamma 校正相關
 * - 當處理真實光場景時 HSI 可能更準確
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
const hsi = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hsi');
}

declare module './index'
{
	interface IInterpolator
	{
		hsi(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hsi = hsi;

export default hsi;
