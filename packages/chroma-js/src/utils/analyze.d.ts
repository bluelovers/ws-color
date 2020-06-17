declare module '../chroma' {
    interface chroma {
        analyze(data: any, key?: any): any;
    }
}
export declare const analyze: (data: any, key?: any) => {
    domain: number[];
    limits(mode: ILimitsMode, num: number): any[];
    min: number;
    max: number;
    sum: number;
    values: any[];
    count: number;
};
export declare type ILimitsMode = 'e' | 'q' | 'l' | 'k' | 'equal';
declare module '../chroma' {
    interface chroma {
        limits(data: number[], mode: ILimitsMode, c: number): number[];
    }
}
export declare const limits: (data: any, mode?: ILimitsMode, num?: number) => any[];
declare const _default: {
    analyze: (data: any, key?: any) => {
        domain: number[];
        limits(mode: ILimitsMode, num: number): any[];
        min: number;
        max: number;
        sum: number;
        values: any[];
        count: number;
    };
    limits: (data: any, mode?: ILimitsMode, num?: number) => any[];
};
export default _default;
