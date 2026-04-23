/**
 * W3C X11 顏色名稱模組 / W3C X11 Color Names Module
 *
 * W3C X11 顏色名稱是源自 X Window System (X11) 的 HTML4 顏色名稱標準。
 * 這些名稱由 X Consortium 在 1990 年代初期標準化，後被 W3C 採納為 HTML4 規範的一部分。
 *
 * W3C X11 color names are the HTML4 standard color names derived from X Window System (X11).
 * These names were standardized by the X Consortium in the early 1990s and later adopted by W3C as part of the HTML4 specification.
 *
 * 命名特點：
 * - 基於常見物品名稱（如 tomato、steelblue、lavender）
 * - 部分顏色带有修饰词（如 light、dark、pale、deep）
 * - 共 147 個顏色名稱
 *
 * Naming characteristics:
 * - Based on common object names (e.g., tomato, steelblue, lavender)
 * - Some colors have modifiers (e.g., light, dark, pale, deep)
 * - Total of 147 color names
 *
 * @module colors/w3cx11
 */

import colors from './index';
import { defaults } from 'lodash';
import { w3cx11, IW3CX11ColorNames } from '@bluelovers/color-palette/lib/w3cx11';

/** 匯出 W3C X11 顏色名稱類型 / Export W3C X11 color names type */
export type { IW3CX11ColorNames }

/**
 * 介面扩展 / Interface augmentation
 *
 * 將 W3C X11 顏色名稱擴展到 IColorNames 介面。
 * Extends W3C X11 color names to IColorNames interface.
 *
 * 允許 w3cx11 中的額外顏色名稱與基礎 colors 物件合併。
 * Allows additional color names from w3cx11 to be merged with base colors object.
 */
declare module './index'
{
	interface IColorNames extends IW3CX11ColorNames
	{

	}
}

/**
 * 使用 lodash defaults 將 W3C X11 顏色合併到基礎 colors 物件
 * 使用 lodash defaults to merge W3C X11 colors into base colors object
 *
 * lodash defaults 會將 w3cx11 中的顏色填入 colors（如果該 key 不存在）。
 * This ensures W3C X11 colors fill in any gaps in the base colors object.
 */
defaults(colors, w3cx11)

export default w3cx11;
