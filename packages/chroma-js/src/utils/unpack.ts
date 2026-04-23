import type from './type';
import { IColorSpaces } from '../types';

/**
 * 解包參數陣列為指定顏色空間的數值
 * Unpack argument array into color space values
 *
 * 根據 keyOrder 字串順序提取並排序物件屬性，或直接回傳陣列
 * Extracts and sorts object properties by keyOrder string order, or returns array directly
 *
 * @param args - 輸入參數陣列 / Input argument array
 * @param keyOrder - 屬性順序字串（如 "rgb"）/ Property order string (e.g., "rgb")
 * @returns 顏色空間數值 / Color space values
 */
export default <K extends keyof IColorSpaces>(args: any[], keyOrder?: K): IColorSpaces[K] =>
{
	/**
	 * 若參數數量 >= 3，直接回傳作為陣列
	 * If argument count >= 3, return as array directly
	 */
	if (args.length >= 3) return Array.prototype.slice.call(args) as any;

	/**
	 * 若只有一個參數且為物件，使用 keyOrder 提取並排序屬性
	 * If only one argument and it's an object, use keyOrder to extract and sort properties
	 */
	if (type(args[0]) == 'object' && keyOrder)
	{
		return keyOrder.split('')
			.filter(k => args[0][k] !== undefined)
			.map(k => args[0][k]) as any;
	}

	/**
	 * 否則直接回傳第一個參數（假設是參數陣列）
	 * Otherwise return the first argument (supposed to be an array of args)
	 */
	return args[0] as any;
};
