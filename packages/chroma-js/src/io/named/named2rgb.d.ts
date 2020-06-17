/**
 * Created by user on 2020/6/17.
 */
import { IColorNames } from '../../colors/index';
import '../../colors/w3cx11';
import { IColorSpaces, IRGB } from '../../types';
export declare function hex2name(hex: string): string;
export declare function _named2rgb(name: keyof IColorNames | string): IColorSpaces["rgba"];
export declare function named2rgb(name: keyof IColorNames | string): [number, number, number, number];
export declare function rgba_is_transparent(rgba: IRGB): boolean;
export default named2rgb;
