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
	hex: string,
	num: number,
	named: string,
	css: string;
}

export type IInterpolationMode = "rgb" | "hsl" | "hsv" | "hsi" | "lab" | "lch" | "hcl" | "lrgb" | keyof IColorSpaces;

export interface IScale<OutType = Color>
{
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
	colors(c: number | undefined,
		format: undefined | null | 'alpha' | 'darken' | 'brighten' | 'saturate' | 'desaturate',
	): Color[];

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

export interface ICubehelix
{
	/**
	 * Set start color for hue rotation, default=300
	 */
	start(): number;

	start(s: number): ICubehelix;

	/**
	 * number (and direction) of hue rotations (e.g. 1=360°, 1.5=`540°``), default=-1.5
	 */
	rotations(): number;

	rotations(r: number): ICubehelix;

	/**
	 * gamma factor can be used to emphasise low or high intensity values, default=1
	 */
	gamma(): number;

	gamma(g: number): ICubehelix;

	/**
	 * lightness range: default: [0,1] (black -> white)
	 */
	lightness(): number;

	lightness(l: number[]): ICubehelix;

	/**
	 * You can call cubehelix.scale() to use the cube-helix through the chroma.scale interface.
	 */
	scale(): IScale;

	hue(): number;

	hue(hue: number | [number, number]): ICubehelix
}

export interface IRGB extends Array<number>
{
	_clipped?: boolean,
	_unclipped?: number[],
}

export type IRGBValue = IColorSpaces["rgba"] | IColorSpaces["rgb"] | number[];
