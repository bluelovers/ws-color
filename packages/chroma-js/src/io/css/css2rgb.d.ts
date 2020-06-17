import { IColorSpaces } from '../../types';
declare const css2rgb: {
    (css: any): IColorSpaces["rgba"];
    test(s: any): boolean;
};
export default css2rgb;
