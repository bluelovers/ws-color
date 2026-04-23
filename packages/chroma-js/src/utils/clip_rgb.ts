/**
 * RGB 顏色裁剪工具
 * RGB color clipping utility
 *
 * 將 RGB/ RGBA 數值裁剪到有效範圍內
 * Clips RGB/RGBA values to valid ranges
 */
import limit from './limit';
import { IRGB, IRGBValue } from '../types';

/**
 * 裁剪 RGB 數值到有效範圍
 * Clip RGB values to valid ranges
 *
 * RGB 值裁剪到 0-255，Alpha 值裁剪到 0-1
 * 同時記錄原始值以便還原
 * Clips RGB values to 0-255, Alpha to 0-1
 * Also records original values for restoration
 *
 * @param rgb - RGB/RGBA 陣列 / RGB/RGBA array
 * @returns 裁剪後的 RGB 陣列 / Clipped RGB array
 */
export default (rgb: IRGB) =>
{
	/**
	 * 初始化裁剪標記和原始值儲存
	 * Initialize clipped flag and store original values
	 */
	rgb._clipped = false;
	rgb._unclipped = rgb.slice(0);

	/**
	 * 對每個通道進行裁剪
	 * Clip each channel
	 */
	for (let i = 0; i <= 3; i++)
	{
		if (i < 3)
		{
			/**
			 * 檢查 RGB通道是否超出範圍
			 * Check if RGB channel is out of range
			 */
			if (rgb[i] < 0 || rgb[i] > 255) rgb._clipped = true;
			rgb[i] = limit(rgb[i], 0, 255);
		}
		else if (i === 3)
		{
			/**
			 * Alpha 通道裁剪到 0-1 範圍
			 * Clip alpha channel to 0-1 range
			 */
			rgb[i] = limit(rgb[i], 0, 1);
		}
	}
	return rgb;
};
