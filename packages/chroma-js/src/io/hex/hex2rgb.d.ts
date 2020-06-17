import { IColorSpaces } from '../../types';
export declare const RE_HEX: RegExp;
export declare const RE_HEXA: RegExp;
declare const hex2rgb: (hex: string) => IColorSpaces["rgba"];
export default hex2rgb;
