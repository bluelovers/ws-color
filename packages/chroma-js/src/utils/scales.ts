/**
 * 預定義色彩比例尺 / Pre-defined Color Scales
 */
import chroma from '../chroma';
import '../io/hsl';
import scale from '../generator/scale';

/**
 * 預定義色彩比例尺集合
 * Pre-defined color scale collection
 *
 * 提供常用的色彩漸層，如冷色調和熱色調
 * Provides common color gradients like cool and hot tones
 */
const scales = {
	/**
	 * 冷色調比例尺（藍色到紫色）
	 * Cool color scale (blue to purple)
	 *
	 * 適合表示低溫或冷系列資料
	 * Suitable for low temperature or cold series data
	 */
	cool() { return scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]) },

	/**
	 * 熱色調比例尺（黑色到紅色再到黃色最後白色）
	 * Hot color scale (black to red to yellow to white)
	 *
	 * 適合表示高溫或熱系列資料
	 * Suitable for high temperature or hot series data
	 */
	hot() { return scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb') },
};

declare module '../chroma'
{
	interface chroma
	{
		scales: typeof scales
	}
}

export default scales
