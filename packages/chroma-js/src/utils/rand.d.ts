/**
 * Created by user on 2020/6/17.
 */
import { IColorSpaces, IRGBValue } from '../types';
import Color from '../Color';
import { IW3CX11ColorNames } from '../../../color-palette';
export interface IOptionsRand {
    fn?(index?: number, value?: number, rgba?: IColorSpaces["rgba"]): number;
    includeAlpha?: boolean;
    round?: boolean;
    length?: number;
    rgba?: IRGBValue | Color | keyof IW3CX11ColorNames;
}
export declare function _handleOptions<T extends IOptionsRand>(options?: T): T;
export declare function rand(options?: IOptionsRand | IRGBValue | Color | keyof IW3CX11ColorNames): IColorSpaces["rgba"];
export declare function _randomHex(options?: IOptionsRand): string;
export declare function randomHex(options?: IOptionsRand): string;
export default rand;
