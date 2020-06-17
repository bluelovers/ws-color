import Color from '../../Color';
import hsi2rgb from './hsi2rgb';
import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the `hue`, `saturation`, and `intensity`
         * components, each as number between 0 and 255. Note that for hue-less
         *  colors (black, white, and grays), the hue component will be NaN.
         *
         * @example
         * chroma('orange').hsi() === [39.64,1,0.55]
         * chroma('white').hsi() === [NaN,0,1]
         */
        hsi(): IColorSpaces["hsi"];
    }
}
declare module '../../chroma' {
    interface chroma {
        hsi(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        hsi: typeof hsi2rgb;
    }
}
