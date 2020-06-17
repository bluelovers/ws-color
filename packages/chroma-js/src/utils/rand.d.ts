/**
 * Created by user on 2020/6/17.
 */
import { IColorSpaces, IRGBValue } from '../types';
export interface IOptionsRand {
    fn?(index?: number, value?: number, rgba?: IColorSpaces["rgba"]): number;
    includeAlpha?: boolean;
    round?: boolean;
    length?: number;
    rgba?: IRGBValue;
}
export declare function _handleOptions<T extends IOptionsRand>(options?: T): T;
export declare function rand(options?: IOptionsRand): IColorSpaces["rgba"];
export declare function _randomHex(options?: IOptionsRand): string;
export declare function randomHex(options?: IOptionsRand): string;
export default rand;
