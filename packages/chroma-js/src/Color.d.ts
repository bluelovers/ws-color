import { IRGB } from './utils/clip_rgb';
import { IRgb2HexMode } from './io/hex/rgb2hex';
import { IColorSpaces } from './types';
export declare class Color {
    _rgb: IRGB;
    hex?(mode?: IRgb2HexMode): string;
    /**
     * Creates a color from a string representation (as supported in CSS).
     * Creates a color from a number representation [0; 16777215]
     *
     * @param color The string to convert to a color.
     * @return the color object.
     */
    constructor(color: string | number);
    /**
     * Create a color in the specified color space using a, b and c as values.
     *
     * @param colorSpace The color space to use. Defaults to "rgb".
     * @return the color object.
     */
    constructor(a: number, b: number, c: number, colorSpace?: keyof IColorSpaces);
    constructor(a: number, b: number, c: number, d: number, colorSpace?: keyof IColorSpaces);
    /**
     * Create a color in the specified color space using values.
     *
     * @param values An array of values (e.g. [r, g, b, a?]).
     * @param colorSpace The color space to use. Defaults to "rgb".
     * @return the color object.
     */
    constructor(values: number[], colorSpace?: keyof IColorSpaces);
    constructor(...args: any[]);
    toString(): string;
}
export default Color;
