import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';

import rgb2hsi from './rgb2hsi';

import hsi2rgb from './hsi2rgb';
import { IColorSpaces } from '../../types';
import hcg2rgb from '../hcg/hcg2rgb';

/** 擴充 Color 類型定義 / Extend Color type definition */
declare module '../../Color'
{
	interface Color
	{
		/**
		 * 回傳包含色相 (hue)、飽和度 (saturation)、強度 (intensity) 的陣列
		 * Returns an array with the `hue`, `saturation`, and `intensity` components
		 *
		 * 各元件值為 0-255 之間的數字
		 * 注意：無色相色彩（黑、白、灰）色相元件會是 NaN
		 * Each component is a number between 0 and 255
		 * Note that for hue-less colors (black, white, and grays), the hue component will be NaN
		 *
		 * @example
		 * chroma('orange').hsi() === [39.64,1,0.55]
		 * chroma('white').hsi() === [NaN,0,1]
		 */
		hsi(): IColorSpaces["hsi"];
	}
}

/** 擴充 chroma 函式庫 / Extend chroma library */
declare module '../../chroma'
{
	interface chroma
	{
		/** 建立 HSI 色彩 / Create HSI color */
		hsi(...args): Color
	}
}

/** 擴充輸入格式類型 / Extend input format types */
declare module '../input'
{
	interface IColorInputObjectFormat
	{
		hsi: typeof hsi2rgb
	}
}

/**
 * 將 Color.prototype.hsi 設為 rgb2hsi 函式
 * Set Color.prototype.hsi to rgb2hsi function
 */
Color.prototype.hsi = function ()
{
	return rgb2hsi(this._rgb);
};

/** 註冊 chroma.hsi 為色彩工廠函式 / Register chroma.hsi as color factory function */
chroma.hsi = (...args) => new Color(...args, 'hsi');

/** 設定 hsi 為正式輸入格式 / Set hsi as formal input format */
input.format.hsi = hsi2rgb;

/**
 * 設定自動偵測 hsi 色彩的條件
 * Set conditions for auto-detecting hsi colors
 */
setupInputAutodetect({
	p: 2,
	/** 自動偵測邏輯：檢查是否為有效的 hsi 陣列
	 * Auto-detection logic: check for valid hsi array
	 */
	test: (...args) =>
	{
		args = unpack(args, 'hsi');
		/** 檢查是否為三元素陣列 / Check for 3-element array */
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hsi';
		}
	},
});
