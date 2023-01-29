import { IOptions } from 'loop-colors';
import { Colord } from 'colord';
import { IOptionsRandColorUtil } from '@lazy-color/rand-util';
import { ITSArrayListMaybeReadonly } from 'ts-type/lib/type/base';
import { AnyColor } from 'colord/types';
export type IColorInput = AnyColor | Colord;
export interface IOptionsColordRandLoop extends IOptions<IColorInput, Colord>, IOptionsRandColorUtil {
    cache?: Set<string>;
    colors?: ITSArrayListMaybeReadonly<IColorInput>;
}
export declare function createDefaultGenerator({ cache, ...opts }: IOptionsColordRandLoop): (colors: ITSArrayListMaybeReadonly<IColorInput>, position: number) => Colord;
export declare function createColordRandLoop(options?: IOptionsColordRandLoop): (startIndex?: number) => Generator<Colord, undefined, Colord>;
export declare function colordRandLoop(startIndex?: number, options?: IOptionsColordRandLoop): Generator<Colord, undefined, Colord>;
export default colordRandLoop;
