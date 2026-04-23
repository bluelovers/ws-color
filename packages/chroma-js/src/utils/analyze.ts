/**
 * 顏色資料分析工具
 * Color data analysis utilities
 *
 * 提供資料分析和分組功能
 * Provides data analysis and grouping functions
 */
import type from './type';
import { IColorBrewer } from '../colors/colorbrewer';
import { isNumber } from './type-is';
import typePredicates from 'ts-type-predicates';

const { log, pow, floor, abs } = Math;

declare module '../chroma'
{
	interface chroma
	{
		analyze: typeof analyze;

		/**
		 * Helper function that computes class breaks based on data.
		 * Mode:
		 *  <li>equidistant <code>'e'</code> breaks are computed by dividing the total range of the data into n groups
		 *  of equal size.
		 *  <li>quantile <code>'q'</code> input domain is divided by quantile ranges.
		 *  <li>logarithmic <code>'l'</code> breaks are equidistant breaks but on a logarithmic scale.
		 *  <li>k-means <code>'k'</code> breaks use the 1-dimensional
		 *  [k-means clustering algorithm]{@link https://en.wikipedia.org/wiki/K-means_clustering} to find (roughly) n
		 *  groups of "similar" values. Note that this k-means implementation does not guarantee to find exactly n groups.
		 */
		limits: typeof limits;
	}
}

/**
 * 分組模式類型
 * Grouping mode types
 */
export type ILimitsMode = 'e' | 'q' | 'l' | 'k' | 'equal'

/**
 * 分析回傳結果介面
 * Analysis return result interface
 *
 * 包含顏色資料的統計資訊與分組邊界計算功能
 * Contains color data statistics and class breaks calculation capability
 */
export interface IReturnTypeAnalyze
{
	/** 最小值 / Minimum value */
	min: number;
	/** 最大值 / Maximum value */
	max: number;
	/** 總和 / Sum */
	sum: number;
	/** 數值陣列 / Array of values */
	values: number[];
	/** 數量 / Count */
	count: number;
	/** 資料範圍 / Data range */
	domain: [number, number],

	/**
	 * 計算分組邊界 / Calculate class breaks
	 * @param mode - 分組模式 / Grouping mode
	 * @param num - 分組數量 / Number of groups
	 */
	limits(mode: ILimitsMode, num: number)
}

export type IAnalyzeInput01<T extends number> = T[]
export type IAnalyzeInput02<T extends number> = Record<any, T>
export type IAnalyzeInput03<T extends number> = Record<any, T>[]
export type IAnalyzeInput04<T extends number> = Record<any, Record<any, T>>

export type IAnalyzeInput<T extends number = number> =
	IAnalyzeInput01<T>
	| IAnalyzeInput02<T>
	| IAnalyzeInput03<T>
	| IAnalyzeInput04<T>;

/**
 * 分析顏色資料並計算統計資訊
 * Analyze color data and compute statistics
 *
 * 支援多種輸入格式：陣列、物件、巢狀物件
 * Supports multiple input formats: arrays, objects, nested objects
 *
 * @param data - 輸入資料 / Input data
 * @param key - 提取鍵名（當資料為物件時）/ Extraction key (when data is an object)
 * @returns 包含統計資訊與分組計算功能的物件 / Object with statistics and class breaks calculation
 *
 * @example
 * ```typescript
 * // 分析數值陣列
 * // Analyze numeric array
 * const data = [1, 5, 10, 15, 20, 50, 100];
 * const result = chroma.analyze(data);
 * result.min; // 1
 * result.max; // 100
 * result.sum; // 201
 * result.count; // 7
 * result.domain; // [1, 100]
 *
 * // 分析物件資料（指定鍵名）
 * // Analyze object data with key extraction
 * const objData = [
 *   { value: 10, label: 'a' },
 *   { value: 20, label: 'b' },
 *   { value: 30, label: 'c' },
 * ];
 * const result2 = chroma.analyze(objData, 'value');
 * result2.max; // 30
 *
 * // 結合 limits 方法使用
 * // Use with limits method
 * const breaks = chroma.analyze([1, 5, 10, 15, 20, 50, 100]).limits('equal', 5);
 * // [1, 20.8, 40.6, 60.4, 80.2, 100]
 * ```
 */
export function analyze<T extends number, K extends keyof T>(data: IAnalyzeInput<T>,
	key?: K,
): IReturnTypeAnalyze
{
	const r = {
		min: Number.MAX_VALUE,
		max: Number.MAX_VALUE * -1,
		sum: 0,
		values: [] as number[],
		count: 0,
	} as IReturnTypeAnalyze;

	if (type(data) === 'object')
	{
		data = Object.values(data);
	}

	(data as T[]).forEach(val =>
	{
		if (key && type(val) === 'object')
		{
			val = val[key] as any
		}

		if (val !== undefined && val !== null && isNumber(val as any))
		{
			r.values.push(val);
			r.sum += val;
			if (val < r.min) r.min = val;
			if (val > r.max) r.max = val;
			r.count += 1;
		}
	});

	return {
		...r,
		domain: [r.min, r.max],
		limits(mode: ILimitsMode, num: number)
		{
			return limits(r, mode, num)
		},
	};
}

export type ILimitsInput01<T extends number> = T[]
export type ILimitsInput02<T extends number> = (unknown | T)[]
export type ILimitsInput03<T extends number> = [T, T]
export type ILimitsInput04<T extends number> = IAnalyzeInput01<T> | IAnalyzeInput03<T>

export type ILimitsInput<T extends number = number> =
	ILimitsInput01<T>
	| ILimitsInput02<T>
	| ILimitsInput03<T>
	| ILimitsInput04<T>
	| IReturnTypeAnalyze
	;

/**
 * 計算分組邊界（類別斷點）
 * Compute class breaks (class breaks)
 *
 * 根據不同模式將資料分組：
 * Divides data into groups based on different modes:
 * - equal (e): 等距分割 - 將資料範圍等分為 n 個區間
 *   Equal division - divide data range into n equal intervals
 * - quantile (q): 分位數分割 - 每個區間包含相同數量的資料點
 *   Quantile division - each interval contains equal number of data points
 * - logarithmic (l): 對數尺度 - 在對數空間中等距分割（適用於正向偏斜資料）
 *   Logarithmic scale - equidistant in log space (for positively skewed data)
 * - k-means (k): K-means 聚類 - 使用聚類演算法找到相似值的群組
 *   K-means clustering - find groups of similar values using clustering algorithm
 *
 * 注意：K-means 實現無法保證精確找到 n 個群組
 * Note: K-means implementation does not guarantee to find exactly n groups
 * [k-means clustering algorithm]{@link https://en.wikipedia.org/wiki/K-means_clustering}
 *
 * @param data - 輸入資料 / Input data
 * @param mode - 分組模式 / Grouping mode (e/equal, q/quantile, l/logarithmic, k/k-means)
 * @param num - 分組數量 / Number of groups
 * @returns 分組邊界陣列 / Array of class breaks
 *
 * @example
 * ```typescript
 * const data = [1, 5, 10, 15, 20, 50, 100];
 *
 * // 等距分割模式（預設）
 * // Equal interval mode (default)
 * chroma.limits(data, 'equal', 4);
 * // [1, 25.75, 50.5, 75.25, 100]
 *
 * // 分位數分割模式
 * // Quantile mode
 * chroma.limits(data, 'quantile', 3);
 * // 每個區間包含約相同數量的資料點
 * // Each interval contains approximately equal number of data points
 *
 * // 對數尺度模式（適用於偏斜資料）
 * // Logarithmic mode (for skewed data)
 * chroma.limits([1, 10, 100, 1000, 10000], 'logarithmic', 4);
 * // [1, 10, 100, 1000, 10000]
 *
 * // K-means 聚類模式
 * // K-means clustering mode
 * chroma.limits([1, 2, 8, 9, 10, 11, 50], 'k-means', 3);
 * ```
 */
export function limits(data: ILimitsInput,
	mode: ILimitsMode = 'equal',
	num = 7,
): [number, number] | number[]
{
	if (Array.isArray(data))
	{
		data = analyze(data as Extract<ILimitsInput, IAnalyzeInput>);
	}
	const { min, max } = data;
	const values = data.values.sort((a, b) => a - b);

	if (num === 1)
	{ return [min, max]; }

	const limits: number[] = [];

	/**
	 * 處理連續模式：只返回最小值與最大值
	 * Handle continuous mode: return only min and max values
	 */
	if (mode.substr(0, 1) === 'c')
	{ // continuous
		limits.push(min);
		limits.push(max);
	}

	/**
	 * 等距分割模式：將資料範圍等分為 num 個區間
	 * Equal interval mode: divide data range into num equal intervals
	 *
	 * 適用於均勻分佈的資料，可以清楚顯示資料範圍
	 * Suitable for uniformly distributed data, clearly shows data range
	 */
	if (mode.substr(0, 1) === 'e')
	{ // equal interval
		limits.push(min);
		for (let i = 1; i < num; i++)
		{
			limits.push(min + ((i / num) * (max - min)));
		}
		limits.push(max);
	}

	/**
	 * 對數尺度模式：在對數空間中進行等距分割
	 * Logarithmic scale mode: equidistant in logarithmic space
	 *
	 * 適用於正向偏斜的資料（如人口、收入等），可以使小值區間更加明顯
	 * Suitable for positively skewed data (e.g., population, income),
	 * makes small value ranges more visible
	 *
	 * 注意：需要所有值為正數
	 * Note: requires all positive values
	 */
	else if (mode.substr(0, 1) === 'l')
	{ // log scale
		if (min <= 0)
		{
			throw new Error('Logarithmic scales are only possible for values > 0');
		}
		const min_log = Math.LOG10E * log(min);
		const max_log = Math.LOG10E * log(max);
		limits.push(min);
		for (let i = 1; i < num; i++)
		{
			limits.push(pow(10, min_log + ((i / num) * (max_log - min_log))));
		}
		limits.push(max);
	}

	/**
	 * 分位數模式：每個區間包含相同數量的資料點
	 * Quantile mode: each interval contains equal number of data points
	 *
	 * 適用於不均匀分佈的資料，確保每個區間都有代表性資料
	 * Suitable for unevenly distributed data,
	 * ensures each interval has representative data
	 *
	 * 使用線性插值處理非整數位置
	 * Uses linear interpolation for non-integer positions
	 */
	else if (mode.substr(0, 1) === 'q')
	{ // quantile scale
		limits.push(min);
		for (let i = 1; i < num; i++)
		{
			const p = ((values.length - 1) * i) / num;
			const pb = floor(p);
			if (pb === p)
			{
				limits.push(values[pb]);
			}
			else
			{ // p > pb
				const pr = p - pb;
				limits.push((values[pb] * (1 - pr)) + (values[pb + 1] * pr));
			}
		}
		limits.push(max);

	}

	/**
	 * K-means 聚類模式：使用迭代演算法找到相似值的群組
	 * K-means clustering mode: find groups of similar values using iterative algorithm
	 *
	 * 設計目的：將相似的值分組在一起，適用於自然分佈的資料
	 * Design purpose: group similar values together, suitable for naturally distributed data
	 *
	 * 演算法說明：
	 * Algorithm explanation:
	 * 1. 初始化 centroids（質心）- 在資料範圍內均勻分布
	 *    Initialize centroids - evenly distributed in data range
	 * 2. 分配步驟 - 將每個值分配到最近的質心
	 *    Assignment step - assign each value to nearest centroid
	 * 3. 更新步驟 - 重新計算每個群組的質心
	 *    Update step - recalculate centroids for each group
	 * 4. 重複直到收斂或達到最大迭代次數
	 *    Repeat until convergence or max iterations
	 *
	 * 引用來源：基於 figue.js 的實現（簡化為一維資料）
	 * Reference: Based on figue.js implementation (simplified for 1-d input)
	 */
	else if (mode.substr(0, 1) === 'k')
	{
		/**
		 * K-means 聚類實現
		 * K-means clustering implementation
		 *
		 * 使用迭代方式收斂到穩定的質心位置
		 * Uses iterative approach to converge to stable centroid positions
		 */
		let cluster;
		const n = values.length;
		const assignments = new Array(n);
		const clusterSizes = new Array(num);
		let repeat = true;
		let nb_iters = 0;
		let centroids = null;

		/**
		 * 初始化質心：使用均勻分布的初始值
		 * Initialize centroids: use evenly distributed initial values
		 *
		 * 這樣可以確保所有資料範圍都被覆蓋
		 * This ensures all data ranges are covered
		 */
		// get seed values
		centroids = [];
		centroids.push(min);
		for (let i = 1; i < num; i++)
		{
			centroids.push(min + ((i / num) * (max - min)));
		}
		centroids.push(max);

		/**
		 * 迭代優化迴圈：分配 -> 更新 -> 檢查收斂
		 * Iteration optimization loop: assign -> update -> check convergence
		 */
		while (repeat)
		{
			/**
			 * 分配步驟：將每個資料點分配到最近的質心
			 * Assignment step: assign each data point to nearest centroid
			 */
			// assignment step
			for (let j = 0; j < num; j++)
			{
				clusterSizes[j] = 0;
			}
			for (let i = 0; i < n; i++)
			{
				const value = values[i];
				let mindist = Number.MAX_VALUE;
				let best;
				for (let j = 0; j < num; j++)
				{
					const dist = abs(centroids[j] - value);
					if (dist < mindist)
					{
						mindist = dist;
						best = j;
					}
					clusterSizes[best]++;
					assignments[i] = best;
				}
			}

			/**
			 * 更新步驟：計算每個群組的新質心（平均值）
			 * Update step: calculate new centroids for each group (mean value)
			 */
			// update centroids step
			const newCentroids = new Array(num);
			for (let j = 0; j < num; j++)
			{
				newCentroids[j] = null;
			}
			for (let i = 0; i < n; i++)
			{
				cluster = assignments[i];
				if (newCentroids[cluster] === null)
				{
					newCentroids[cluster] = values[i];
				}
				else
				{
					newCentroids[cluster] += values[i];
				}
			}
			for (let j = 0; j < num; j++)
			{
				newCentroids[j] *= 1 / clusterSizes[j];
			}

			/**
			 * 檢查收斂：質心是否不再變化
			 * Check convergence: whether centroids stop changing
			 *
			 * 如果所有質心與之前相同，則表示已收斂
			 * If all centroids are the same as before, it means converged
			 */
			// check convergence
			repeat = false;
			for (let j = 0; j < num; j++)
			{
				if (newCentroids[j] !== centroids[j])
				{
					repeat = true;
					break;
				}
			}

			centroids = newCentroids;
			nb_iters++;

			/**
			 * 安全閥：避免无限迭代
			 * Safety valve: avoid infinite iteration
			 *
			 * 超過 200 次迭代後強制停止
			 * Force stop after 200 iterations
			 */
			if (nb_iters > 200)
			{
				repeat = false;
			}
		}

		/**
		 * 收集最終的聚類邊界
		 * Collect final cluster boundaries
		 *
		 * 每個群組的邊界值（最小值和最大值）
		 * Boundary values for each group (min and max)
		 */
		// finished k-means clustering
		// the next part is borrowed from gabrielflor.it
		const kClusters = {};
		for (let j = 0; j < num; j++)
		{
			kClusters[j] = [];
		}
		for (let i = 0; i < n; i++)
		{
			cluster = assignments[i];
			kClusters[cluster].push(values[i]);
		}
		let tmpKMeansBreaks = [];
		for (let j = 0; j < num; j++)
		{
			tmpKMeansBreaks.push(kClusters[j][0]);
			tmpKMeansBreaks.push(kClusters[j][kClusters[j].length - 1]);
		}
		tmpKMeansBreaks = tmpKMeansBreaks.sort((a, b) => a - b);
		limits.push(tmpKMeansBreaks[0]);
		for (let i = 1; i < tmpKMeansBreaks.length; i += 2)
		{
			const v = tmpKMeansBreaks[i];
			if (!isNaN(v) && (limits.indexOf(v) === -1))
			{
				limits.push(v);
			}
		}
	}
	return limits;
}

export default { analyze, limits };
