import { IRGB } from '../../types';
declare const enum EnumContrastFrontThreshold {
    t01 = 131.5,
    t02 = 120
}
export declare function _contrast000(rgba: IRGB): number;
export declare function _contrast001(rgba: IRGB, threshold?: EnumContrastFrontThreshold): boolean;
export declare function _contrast002(rgba: IRGB, threshold?: number): "black" | "white";
export interface IOptionsContrastFront {
    black?: string;
    white?: string;
    threshold?: number;
}
/**
 * get contrast color for use as front text color
 */
export declare function contrastFront(rgba: IRGB, options?: IOptionsContrastFront): string;
export {};
