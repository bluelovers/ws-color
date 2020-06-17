import { IColorSpaces } from '../../types';
declare const css2rgb: {
    (css: string): IColorSpaces["rgba"];
    test(s: any): s is string;
};
export default css2rgb;
