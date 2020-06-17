import Color from '../../Color';
import { IColorSpaces } from '../../types';
import lab2rgb from './lab2rgb';
declare module '../../Color' {
    interface Color {
        lab(): IColorSpaces["lab"];
    }
}
declare module '../../chroma' {
    interface chroma {
        lab(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        lab: typeof lab2rgb;
    }
}
