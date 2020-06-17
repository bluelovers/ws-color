import Color from '../../Color';
import { IColorSpaces } from '../../types';
import cmyk2rgb from './cmyk2rgb';
declare module '../../Color' {
    interface Color {
        cmyk(): IColorSpaces["cmyk"];
    }
}
declare module '../../chroma' {
    interface chroma {
        cmyk(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        cmyk: typeof cmyk2rgb;
    }
}
