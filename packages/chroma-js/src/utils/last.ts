/**
 * 取得參數的最後一個元素
 * Get the last element of arguments
 *
 * 用於取得可變參數中的最後一個元素，通常用於自動偵測顏色格式
 * Used to get the last element of variadic arguments, typically for auto-detecting color format
 */
import type from './type';

/**
 * 從參數陣列中取得最後一個非類型參數元素
 * Get the last non-type argument element from the arguments array
 *
 * 這個函式的設計目的是取得可變參數中倒數第二個位置（類型標記）之前的最後一個實際參數
 * The purpose is to get the last actual parameter before the type marker in variadic arguments
 *
 * @param args - 可變參數 / Variadic arguments
 * @returns 最後一個元素轉小寫後的結果 / Last element converted to lowercase
 */
export default <T extends string>(args: any[] | [any, T] | [any, any, T] | [any, any, any, T] | [any, any, any, any, T]): T =>
{
	if (args.length > 1)
	{
		return args[args.length - 1]?.toLowerCase?.()
	}
};
