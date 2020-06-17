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

export type ILimitsMode = 'e' | 'q' | 'l' | 'k' | 'equal'

export interface IReturnTypeAnalyze
{
	min: number;
	max: number;
	sum: number;
	values: number[];
	count: number;
	domain: [number, number],

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

	if (mode.substr(0, 1) === 'c')
	{ // continuous
		limits.push(min);
		limits.push(max);
	}

	if (mode.substr(0, 1) === 'e')
	{ // equal interval
		limits.push(min);
		for (let i = 1; i < num; i++)
		{
			limits.push(min + ((i / num) * (max - min)));
		}
		limits.push(max);
	}

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

	else if (mode.substr(0, 1) === 'k')
	{ // k-means clustering
		/*
		implementation based on
		http://code.google.com/p/figue/source/browse/trunk/figue.js#336
		simplified for 1-d input values
		*/
		let cluster;
		const n = values.length;
		const assignments = new Array(n);
		const clusterSizes = new Array(num);
		let repeat = true;
		let nb_iters = 0;
		let centroids = null;

		// get seed values
		centroids = [];
		centroids.push(min);
		for (let i = 1; i < num; i++)
		{
			centroids.push(min + ((i / num) * (max - min)));
		}
		centroids.push(max);

		while (repeat)
		{
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

			if (nb_iters > 200)
			{
				repeat = false;
			}
		}

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
