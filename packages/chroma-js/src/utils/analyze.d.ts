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
export declare type IAnalyzeInput01<T extends number> = T[];
export declare type IAnalyzeInput02<T extends number> = Record<any, T>;
export declare type IAnalyzeInput03<T extends number> = Record<any, T>[];
export declare type IAnalyzeInput04<T extends number> = Record<any, Record<any, T>>;
export declare type IAnalyzeInput<T extends number = number> = IAnalyzeInput01<T> | IAnalyzeInput02<T> | IAnalyzeInput03<T> | IAnalyzeInput04<T>;
export declare function analyze<T extends number, K extends keyof T>(data: IAnalyzeInput<T>, key?: K): IReturnTypeAnalyze;
export declare type ILimitsInput01<T extends number> = T[];
export declare type ILimitsInput02<T extends number> = (unknown | T)[];
export declare type ILimitsInput03<T extends number> = [T, T];
export declare type ILimitsInput04<T extends number> = IAnalyzeInput01<T> | IAnalyzeInput03<T>;
export declare type ILimitsInput<T extends number = number> = ILimitsInput01<T> | ILimitsInput02<T> | ILimitsInput03<T> | ILimitsInput04<T> | IReturnTypeAnalyze;
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
export declare function limits(data: ILimitsInput, mode?: ILimitsMode, num?: number): [number, number] | number[];
declare const _default: {
    analyze: typeof analyze;
    limits: typeof limits;
};
export default _default;
