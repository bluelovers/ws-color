import Color from '../../Color';
import { IColorSpaces } from '../../types';
import cmyk2rgb from './cmyk2rgb';
declare module '../../Color' {
    interface Color {
        /**
         * Just like color.rgb but adds the alpha channel to the returned
         * array.
         *
         * @example
         * chroma('orange').rgba() === [255,165,0,1]
         * chroma('hsla(20, 100%, 40%, 0.5)').rgba() === [204,68,0,0.5]
         */
        cmyk(): IColorSpaces["cmyk"];
    }
}
declare module '../../chroma' {
    interface chroma {
        cmyk(c: number, m: number, y: number, k: number): Color;
        cmyk(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        cmyk: typeof cmyk2rgb;
    }
}
