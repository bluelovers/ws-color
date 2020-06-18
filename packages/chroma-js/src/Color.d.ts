import './io/input';
import { IColorSpaces, IRGB } from './types';
export declare class Color {
    _rgb: IRGB;
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
    get [0](): number;
    get [1](): number;
    get [2](): number;
    get [3](): number;
    get length(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
    get _rgba(): IRGB;
    set _rgba(value: IRGB);
    toString(): string;
    clone(): Color;
}
export default Color;
