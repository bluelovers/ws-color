
export type IColorPaletteRecord<K extends string = string> = Record<K, string[]>

export type IColorRGBArray = readonly [
	r: number,
	g: number,
	b: number,
	/**
	 * 0 ~ 1
	 */
	a?: number,
];

export interface IColorRGBObject
{
	r: number,
	g: number,
	b: number,
	/**
	 * 0 ~ 1
	 */
	a?: number,
}
