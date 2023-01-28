import { Colord } from 'colord';
import { AnyColor } from 'colord/types';
import { ITSArrayListMaybeReadonly } from 'ts-type';

export interface IOptions<T = string, R = T> {
	rand?: ((index?: number, length?: number, ...argv: any[]) => number) | boolean;
	limit?: number | -1;
	generator?(colors: readonly T[], position: number, idx: number, len: number): R;
}
export type IColorInput = AnyColor | Colord;
export interface IOptionsColordRandLoop extends IOptions<IColorInput, Colord> {
	cache?: Set<string>;
	colors?: ITSArrayListMaybeReadonly<IColorInput>;
}
export declare function createDefaultGenerator({ cache, }: IOptionsColordRandLoop): (colors: ITSArrayListMaybeReadonly<IColorInput>, position: number) => Colord;
export declare function createColordRandLoop(options?: IOptionsColordRandLoop): (startIndex?: number) => Generator<Colord, undefined, Colord>;
export declare function colordRandLoop(startIndex?: number, options?: IOptionsColordRandLoop): Generator<Colord, undefined, Colord>;

export {
	colordRandLoop as default,
};

export {};
