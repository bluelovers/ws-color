/**
 * Created by user on 2020/6/18.
 */

/**
 * 檢查值是否為有效的數字類型
 * Check if value is a valid number type
 *
 * 必須是 number 類型且不為 NaN
 * Must be number type and not NaN
 *
 * @param n - 要檢測的值 / Value to check
 * @param fn - 可选的回调函数 / Optional callback function
 * @returns 是否為有效數字 / Whether it's a valid number
 */
export function isNumber(n, fn?): n is number
{
	/**
	 * 驗證是否為數字類型且不為 NaN
	 * Verify it's a number type and not NaN
	 */
	return typeof n === 'number' && !isNaN(n)
}
