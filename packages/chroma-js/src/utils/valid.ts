import Color from '../Color';

/**
 * 驗證輸入是否為有效的顏色格式
 * Validates if the input is a valid color format
 *
 * 透過嘗試建立 Color 物件來驗證，若失敗則回傳 false
 * Validates by attempting to create a Color object, returns false if it fails
 *
 * @returns 驗證結果 / Validation result
 *
 * @example
 * ```typescript
 * // 驗證有效的 HEX 顏色格式
 * // Validate valid HEX color format
 * chroma.valid('ff0000'); // true
 *
 * // 驗證有效的 RGB 格式
 * // Validate valid RGB format
 * chroma.valid('rgb(255, 0, 0)'); // true
 *
 * // 驗證無效格式
 * // Validate invalid format
 * chroma.valid('notacolor'); // false
 * ```
 */
function valid(...args)
{
	try
	{
		/**
		 * 嘗試建立 Color 物件，若成功則為有效顏色
		 * Attempt to create a Color object, if successful, color is valid
		 */
		new Color(...args);
		return true;
	}
	catch (e)
	{
		/**
		 * 建立失敗，回傳 false 表示無效顏色
		 * Creation failed, return false to indicate invalid color
		 */
		return false;
	}
};

declare module '../chroma'
{
	interface chroma
	{
		valid: typeof valid
	}
}

export default valid
