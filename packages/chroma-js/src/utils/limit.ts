/**
 * 數值限制工具
 * Value limiting utility
 *
 * 將數值限制在指定範圍內
 * Clamps a value within specified range
 */
import chroma from '../chroma';

/**
 * 將數值限制在 min 和 max 之間
 * Clamps a value between min and max
 *
 * 如果值小於 min，回傳 min
 * If value is less than min, returns min
 * 如果值大於 max，回傳 max
 * If value is greater than max, returns max
 * 否則回傳原值
 * Otherwise returns original value
 *
 * @param x - 要限制的數值 / Value to clamp
 * @param min - 最小值（預設 0）/ Minimum value (default: 0)
 * @param max - 最大值（預設 1）/ Maximum value (default: 1)
 * @returns 限制後的數值 / Clamped value
 */
export function limit(x: number, min = 0, max = 1)
{
	return x < min ? min : x > max ? max : x;
}

declare module '../chroma'
{
	interface chroma
	{
		limit(x: number, min?: number, max?: number): number
	}
}

export default limit
