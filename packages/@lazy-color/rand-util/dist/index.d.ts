export type IColorRGBArray = readonly [
	r: number,
	g: number,
	b: number,
	/**
	 * 0 ~ 1
	 */
	a?: number
];
export interface IColorRGBObject {
	r: number;
	g: number;
	b: number;
	/**
	 * 0 ~ 1
	 */
	a?: number;
}
export type IColorRGBA = readonly number[] | IColorRGBArray;
export interface IOptionsRandColorUtil {
	randFn?(): number;
}
export declare function _handleOptions(opts?: IOptionsRandColorUtil): IOptionsRandColorUtil;
export declare function _randAlpha(opts?: IOptionsRandColorUtil): number;
export declare function _randValue(base: number, opts?: IOptionsRandColorUtil): number;
export declare function _rgbRand<T extends IColorRGBA>(_rgba?: T, opts?: IOptionsRandColorUtil): T;
export declare function _rgbObjectRand<T extends IColorRGBObject>(_rgba?: T, opts?: IOptionsRandColorUtil): {
	r: number;
	g: number;
	b: number;
	a: number;
};
export declare function _rgbObjectToArray<T extends {
	r: number;
	g: number;
	b: number;
	a?: number;
}>(_rgba: T): IColorRGBArray;

export {
	_rgbRand as default,
};

export {};
