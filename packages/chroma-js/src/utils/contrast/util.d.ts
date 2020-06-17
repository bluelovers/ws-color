import { IRGB } from '../../types';
export declare function _contrast001(rgba: IRGB): boolean;
export declare function _contrast002(rgba: IRGB): "black" | "white";
export interface IOptionsContrastFront {
    black?: string;
    white?: string;
}
/**
 * get contrast color for use as front text color
 */
export declare function contrastFront(rgba: IRGB, options?: IOptionsContrastFront): string;
