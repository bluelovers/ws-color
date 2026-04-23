/**
 * 隨機 RGBA 顏色產生器
 * Random RGBA color generator
 *
 * 允許自定義隨機函式以產生確定的隨機顏色
 * Allows customization of random function for deterministic random colors
 *
 * Created by user on 2020/6/17.
 */
import { IColorSpaces, IRGBValue } from '../types';
import Color from '../Color';
import { IW3CX11ColorNames } from '@bluelovers/color-palette/lib/w3cx11';

/**
 * 用於產生隨機十六進位數字的可選字元
 * Digits used for generating random hexadecimal values
 */
const digits = '0123456789abcdef';

/**
 * 隨機顏色選項介面
 * Random color options interface
 */
export interface IOptionsRand
{
	/** 自定義隨機函式 / Custom random function */
	fn?(index?: number, value?: number, rgba?: IColorSpaces["rgba"]): number,
	/** 是否包含 Alpha 通道 / Whether to include alpha channel */
	includeAlpha?: boolean
	/** 是否四捨五入 / Whether to round */
	round?: boolean,
	/** 產生字元的長度 / Length of characters to generate */
	length?: number,
	/** 基準 RGBA 顏色 / Base RGBA color */
	rgba?: IRGBValue | Color | keyof IW3CX11ColorNames,
}

/**
 * 處理並標準化隨機選項
 * Process and normalize random options
 *
 * 確保選項包含預設的隨機函式 (Math.random)
 * Ensures options include default random function (Math.random)
 */
export function _handleOptions<T extends IOptionsRand>(options?: T): T
{
	let { fn = Math.random as typeof options.fn, includeAlpha } = options ?? {};

	return {
		...options,
		fn,
		includeAlpha,
	}
}

/**
 * 產生隨機 RGBA 顏色陣列
 * Generate random RGBA color array
 *
 * 根據基準顏色和隨機函式產生隨機顏色
 * Generates random color based on base color and random function
 *
 * @param options - 隨機選項（可包含 RGBA 基準值）/ Random options (can include RGBA base value)
 * @returns RGBA 顏色陣列 / RGBA color array
 */
export function rand(options?: IOptionsRand | IRGBValue | Color | keyof IW3CX11ColorNames): IColorSpaces["rgba"]
{
	if (options instanceof Color || Array.isArray(options) || typeof options === 'string')
	{
		options = {
			rgba: options,
		}
	}

	let { rgba, fn, includeAlpha, round } = _handleOptions(options);

	if (rgba instanceof Color)
	{
		rgba = rgba.rgba();
	}
	else if (typeof rgba === 'string')
	{
		rgba = new Color(rgba).rgba();
	}

	rgba = rgba?.slice?.() ?? [];

	let i: number;
	/**
	 * 對 RGB 三通道進行隨機化
	 * Randomize RGB channels
	 */
	for (i = 0; i < 3; i++)
	{
		let value = rgba[i] ?? 255;
		value |= 0;

		value = fn(i, value, rgba as IColorSpaces["rgba"]) * (value);

		if (round === true)
		{
			value = Math.round(value)
		}

		rgba[i] = value;
	}

	/**
	 * 設定預設 Alpha 值為 1（完全不透明）
	 * Set default alpha value to 1 (fully opaque)
	 */
	rgba[3] = rgba[3] ?? 1;

	if (includeAlpha)
	{
		/**
		 * 對 Alpha 通道進行隨機化（限制在有效範圍內）
		 * Randomize alpha channel (clamped to valid range)
		 */
		let value = isNaN(rgba[3]) ? 1 : rgba[3];

		value = fn(i, value, rgba as IColorSpaces["rgba"]) * value

		rgba[3] = Math.max(Math.min(value, 255), 0)
	}

	return rgba as any
}

/**
 * 產生隨機十六進位字串（內部函式）
 * Generate random hexadecimal string (internal function)
 *
 * @param options - 隨機選項 / Random options
 * @returns 十六進位字串 / Hexadecimal string
 */
export function _randomHex(options?: IOptionsRand)
{
	let { fn, includeAlpha, length } = _handleOptions(options);

	length = length > 0 ? length : (includeAlpha ? 8 : 6);

	let ls = [] as string[]
	/**
	 * 根據長度產生隨機十六進位字元
	 * Generate random hexadecimal characters based on length
	 */
	for (let i = 0; i < length; i++)
	{
		let code = digits.charAt(Math.floor(fn(i) * 16));
		ls.push(code)
	}

	return ls.join('');
}

/**
 * 產生隨機十六進位顏色
 * Generate random hexadecimal color
 *
 * @param options - 隨機選項 / Random options
 * @returns 十六進位顏色字串 / Hexadecimal color string
 */
export function randomHex(options?: IOptionsRand)
{
	delete options?.length

	return _randomHex(options)
}

export default rand
