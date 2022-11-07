import { IColorSpaces } from '../../types';
export type IRgb2HexMode = keyof IColorSpaces | 'auto' | 'argb';
declare function rgb2hex(...args: any[]): string;
export default rgb2hex;
