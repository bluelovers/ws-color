import { IColorSpaces } from '../../types';
export type IRgb2CssMode = keyof IColorSpaces;
declare const rgb2css: (...args: any[]) => string;
export default rgb2css;
