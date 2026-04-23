/**
 * 工具函式匯出模組
 * Utilities export module
 *
 * 匯出常用的色彩處理工具函式與數學常數
 * Exports common color processing utilities and mathematical constants
 */
import type from './type';

import limit from './limit';

import clip_rgb from './clip_rgb';

import unpack from './unpack';

import last from './last';

/**
 * 工具函式與類型匯出
 * Utilities and type exports
 */
export {
	clip_rgb,
	limit,
	type,
	unpack,
	last,
}

/**
 * 數學常數定義
 * Mathematical constants definitions
 *
 * 用於色彩計算的常用數學常數
 * Commonly used mathematical constants for color calculations
 */

/** 圓周率 (PI) / Pi */
export const PI = Math.PI;

/** 2π - 完整圓弧度 / Two Pi - full circle radians */
export const TWOPI = PI * 2;

/** π/3 - 60度弧度 / Pi divided by 3 - 60 degrees in radians */
export const PITHIRD = PI / 3;

/** 度數轉弧度轉換因子 / Degree to radian conversion factor */
export const DEG2RAD = PI / 180;

/** 弧度轉度數轉換因子 / Radian to degree conversion factor */
export const RAD2DEG = 180 / PI;

/**
 * 預設匯出（包含所有工具函式與常數）
 * Default export (includes all utilities and constants)
 */
export default {
	clip_rgb,
	limit,
	type,
	unpack,
	last,
	PI,
	TWOPI,
	PITHIRD,
	DEG2RAD,
	RAD2DEG,
}


