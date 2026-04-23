/**
 * 自動偵測色彩格式
 * Auto-detect color format
 *
 * 自動偵測輸入參數的顏色格式並轉換為 RGB
 * Auto-detects input argument color format and converts to RGB
 */
import last from './last';
import _input, { IColorInputObjectFormat } from '../io/input';
import clip_rgb from './clip_rgb';
import { IRGB } from '../types';
import { array_unique_overwrite } from 'array-hyper-unique';

/**
 * 自動偵測回傳結果
 * Auto-detect return result
 */
export interface IReturnTypeAutodetect
{
	/** 原始參數 / Original arguments */
	args: any;
	/** RGB 陣列 / RGB array */
	_rgb: IRGB;
	/** 偵測到的色彩模式 / Detected color mode */
	mode: "temp" | "kelvin" | "temperature" | "css" | "named" | "num" | "hcg" | "hsi" | "cmyk" | "hex" | "lab" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "lch" | "lrgb" | "hcl" | "gl";
	/** 是否成功自動偵測 / Whether auto-detect succeeded */
	autodetect: boolean;
}

/**
 * 自動偵測色彩格式
 * Auto-detect color format
 *
 * 嘗試自動偵測參數的顏色格式
 * 若最後一個參數是有效模式，則使用該模式
 * 否則依序嘗試所有已註冊的格式轉換器
 * Attempts to auto-detect the color format of arguments
 * If the last argument is a valid mode, use that mode
 * Otherwise tries all registered format converters in order
 *
 * @param args - 輸入參數 / Input arguments
 * @returns 偵測結果包含 RGB 和模式 / Detection result with RGB and mode
 *
 * @example
 * ```typescript
 * // 自動偵測 HEX 格式
 * // Auto-detect HEX format
 * const result1 = chroma.autodetect(['#ff0000']);
 * result1._rgb; // [255, 0, 0, 1]
 * result1.mode; // 'hex'
 *
 * // 自動偵測 RGB 格式
 * // Auto-detect RGB format
 * const result2 = chroma.autodetect([255, 128, 0]);
 * result2._rgb; // [255, 128, 0, 1]
 * result2.mode; // 'rgb'
 *
 * // 自動偵測 HSL 格式
 * // Auto-detect HSL format
 * const result3 = chroma.autodetect([180, 100, 50]);
 * result3._rgb; // [0, 255, 255, 1]
 * result3.mode; // 'hsl'
 *
 * // 偵測具名顏色
 * // Detect named colors
 * const result4 = chroma.autodetect(['hotpink']);
 * result4._rgb; // [255, 105, 180, 1]
 * result4.mode; // 'named'
 * ```
 */
export function autodetect(args): IReturnTypeAutodetect
{
	let _rgb: IRGB;

	/**
	 * 取得最後一個元素作為可能的模式
	 * Get the last element as possible mode
	 */
	let mode = last<keyof IColorInputObjectFormat>(args);
	let autodetect = false;

	if (!mode?.length)
	{
		/**
		 * 依優先權排序格式轉換器（高優先權在前）
		 * Sort format converters by priority (high priority first)
		 */
		if (_input.sorted !== true)
		{
			_input.autodetect = _input.autodetect.sort((a, b) => b.p - a.p);

			//array_unique_overwrite(_input.autodetect);

			_input.sorted = true;
		}

		/**
		 * 依序嘗試每個格式轉換器
		 * Try each format converter in order
		 */
		for (let chk of _input.autodetect)
		{
			let m = chk.test(...args)
			if (typeof m !== 'undefined')
			{
				autodetect = true;
				mode = m;
				break
			}
		}
	}

	/**
	 * 根據偵測到的模式轉換顏色
	 * Convert color based on detected mode
	 */
	if (_input.format[mode])
	{
		// @ts-ignore
		const rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1) as any);

		_rgb = clip_rgb(rgb);

		/**
		 * 若缺少 Alpha 通道，預設設為 1（完全不透明）
		 * If alpha channel missing, default to 1 (fully opaque)
		 */
		if (_rgb.length === 3) _rgb.push(1);
	}
	else
	{
		throw new Error(`unknown format: ${args}, mode: ${mode}, autodetect: ${autodetect}`);
	}

	return {
		args,
		_rgb,
		mode,
		autodetect,
	};
}

/**
 * 驗證自動偵測結果是否有效
 * Validate auto-detect result is valid
 *
 * @param ret - 自動偵測結果 / Auto-detect result
 * @throws 若結果無效則拋出錯誤 / Throws error if result is invalid
 */
export function assertAutodetectReturn(ret: IReturnTypeAutodetect): asserts ret is IReturnTypeAutodetect
{
	if (!ret._rgb)
	{
		throw new TypeError(`unknown format: ${ret.args}, mode: ${ret.mode}, autodetect: ${ret.autodetect}, _rgb: ${ret._rgb}`);
	}
}

export default autodetect
