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
export declare function _randAlpha(): number;
export declare function _randValue(base: number): number;
export declare function _rgbRand<T extends IColorRGBA>(_rgba?: T): T;
export declare function _rgbObjectRand<T extends IColorRGBObject>(_rgba?: T): {
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
