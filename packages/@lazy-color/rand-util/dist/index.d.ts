export type IColorRGBA = readonly number[] | readonly [
	number,
	number,
	number,
	number?
];
export declare function _randAlpha(): number;
export declare function _randValue(base: number): number;
export declare function _rgbRand<T extends IColorRGBA>(_rgba?: T): T;
export declare function _rgbObjectRand<T extends {
	r: number;
	g: number;
	b: number;
	a?: number;
}>(_rgba?: T): {
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
}>(_rgba: T): readonly [
	number,
	number,
	number,
	number
];

export {
	_rgbRand as default,
};

export {};
