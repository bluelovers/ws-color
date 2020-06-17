declare module '../chroma' {
    interface chroma {
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
export declare type ILimitsMode = 'e' | 'q' | 'l' | 'k' | 'equal';
export interface IReturnTypeAnalyze {
    min: number;
    max: number;
    sum: number;
    values: number[];
    count: number;
    domain: [number, number];
    limits(mode: ILimitsMode, num: number): any;
}
export declare function analyze<T extends number, K extends keyof T>(data: T[] | Record<any, T | Record<any, number>>, key?: K): IReturnTypeAnalyze;
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
export declare function limits(data: IReturnTypeAnalyze | unknown[], mode?: ILimitsMode, num?: number): [number, number] | number[];
declare const _default: {
    analyze: typeof analyze;
    limits: typeof limits;
};
export default _default;
