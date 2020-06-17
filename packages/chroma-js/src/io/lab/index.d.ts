import Color from '../../Color';
import { IColorSpaces } from '../../types';
import lab2rgb from './lab2rgb';
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the **L**, **a**, and **b** components.
         *
         * @example
         * chroma('orange').lab() === [74.94,23.93,78.95]
         */
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
