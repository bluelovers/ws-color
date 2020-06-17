import Color from './Color';
export interface IColorSpaces {
    rgb: [number, number, number];
    rgba: [number, number, number, number];
    hcg: [number, number, number];
    hsl: [number, number, number, number?];
    hsla: [number, number, number, number];
    hsv: [number, number, number];
    hsi: [number, number, number];
    lab: [number, number, number];
    lch: [number, number, number];
    lrgb: [number, number, number, number];
    hcl: [number, number, number];
    cmyk: [number, number, number, number];
    gl: [number, number, number, number];
}
export interface IColorSpacesExtra {
    hex: string;
    num: number;
    named: string;
    css: string;
}
export declare type IInterpolationMode = "rgb" | "hsl" | "hsv" | "hsi" | "lab" | "lch" | "hcl" | "lrgb" | keyof IColorSpaces;
export interface IChromaConstructor {
    /**
     * Creates a color from a string representation (as supported in CSS).
     * Creates a color from a number representation [0; 16777215]
     *
     * @param color The string to convert to a color.
     * @return the color object.
     */
    (color: string | number): Color;
    /**
     * Create a color in the specified color space using a, b and c as values.
     *
     * @param colorSpace The color space to use. Defaults to "rgb".
     * @return the color object.
     */
    (a: number, b: number, c: number, colorSpace?: keyof IColorSpaces): Color;
    (a: number, b: number, c: number, d: number, colorSpace?: keyof IColorSpaces): Color;
    /**
     * Create a color in the specified color space using values.
     *
     * @param values An array of values (e.g. [r, g, b, a?]).
     * @param colorSpace The color space to use. Defaults to "rgb".
     * @return the color object.
     */
    (values: number[], colorSpace?: keyof IColorSpaces): Color;
}
export interface IColorConstructor {
    /**
     * Creates a color from a string representation (as supported in CSS).
     * Creates a color from a number representation [0; 16777215]
     *
     * @param color The string to convert to a color.
     * @return the color object.
     */
    constructor(color: string | number): Color;
    /**
     * Create a color in the specified color space using a, b and c as values.
     *
     * @param colorSpace The color space to use. Defaults to "rgb".
     * @return the color object.
     */
    constructor(a: number, b: number, c: number, colorSpace?: keyof IColorSpaces): Color;
    constructor(a: number, b: number, c: number, d: number, colorSpace?: keyof IColorSpaces): Color;
    /**
     * Create a color in the specified color space using values.
     *
     * @param values An array of values (e.g. [r, g, b, a?]).
     * @param colorSpace The color space to use. Defaults to "rgb".
     * @return the color object.
     */
    constructor(values: number[], colorSpace?: keyof IColorSpaces): Color;
}
