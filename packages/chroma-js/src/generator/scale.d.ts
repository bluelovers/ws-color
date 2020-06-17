import { IRGB } from '../utils/clip_rgb';
import '../utils/limit';
import Color from '../Color';
import { ICubehelix } from './cubehelix';
import { IColorSpaces } from '../types';
import { IInterpolationMode } from '../types';
declare module '../chroma' {
    interface chroma {
        scale: typeof scale;
    }
}
export interface IScale<OutType = Color> {
    (c: string[]): IScale;
    (value: number): OutType;
    domain(d?: number[], n?: number, mode?: string): this;
    mode(mode: IInterpolationMode): this;
    gamma(g: number): this;
    cache(use: boolean): boolean;
    correctLightness(enable?: boolean): this;
    padding(p: number | number[]): this;
    /**
     * You can call scale.colors(n) to quickly grab `c` equi-distant colors from a color scale. If called with no
     * arguments, scale.colors returns the original array of colors used to create the scale.
     */
    colors(c: number | undefined, format: undefined | null | 'alpha' | 'darken' | 'brighten' | 'saturate' | 'desaturate'): Color[];
    colors(c: number | undefined, format: 'luminance' | 'temperature'): number[];
    colors<K extends keyof IColorSpaces>(c: number | undefined, format: K): Array<IColorSpaces[K]>;
    colors(c: number | undefined, format?: 'hex' | 'name'): string[];
    /**
     * If you want the scale function to return a distinct set of colors instead of a continuous gradient, you can
     * use scale.classes. If you pass a number the scale will broken into equi-distant classes.
     * You can also define custom class breaks by passing them as array
     */
    classes(c: number | number[]): this;
    /**
     * Set out format for scale() call. Passing null will result in a scale which outputs colors.
     */
    out(format: null): IScale;
    out<K extends keyof IColorSpaces>(format: K): IScale<IColorSpaces[K]>;
    out(format: 'hex'): IScale<string>;
}
declare function scale<OutType = Color>(colors: ICubehelix | IRGB | Color[] | [string, string, ...string[]], ...argv: IRGB[]): IScale<OutType>;
export default scale;
