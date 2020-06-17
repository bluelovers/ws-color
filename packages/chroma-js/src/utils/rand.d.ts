/**
 * Created by user on 2020/6/17.
 */
import { IColorSpaces } from '../types';
export declare type IRGBValue = IColorSpaces["rgba"] | IColorSpaces["rgb"] | number[];
export interface IOptionsRand {
    fn?(index: number, value: number, rgba: IColorSpaces["rgba"]): number;
    includeAlpha?: boolean;
}
declare function rand(rgba?: IRGBValue, options?: IOptionsRand): IColorSpaces["rgba"];
export default rand;
