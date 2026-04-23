/**
 * 陣列轉顏色工具
 * Array to colors utility
 *
 * 將字串陣列轉換為 Color 物件陣列
 * Converts string array to Color object array
 */
import Color from '../Color';

/**
 * 將顏色字串陣列轉換為 Color 物件陣列
 * Convert color string array to Color object array
 *
 * @param colors - 顏色字串陣列 / Array of color strings
 * @param argv - 額外參數 / Additional arguments
 * @returns Color 物件陣列 / Array of Color objects
 */
function arr2colors(colors: (string | Color)[], ...argv): Color[]
{
	return colors.map(c => new Color(c, ...argv));
}

export default arr2colors;
