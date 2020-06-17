import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the `hue`, `saturation`, and `value`
         * components. Hue is the color angle in degree (`0..360`),
         * saturation and value are within `0..1`. Note that for hue-less
         * colors (black, white, and grays), the hue component will be NaN.
         *
         * @example
         * chroma('orange').hsv() === [38.82,1,1]
         * chroma('white').hsv() === [NaN,0,1]
         */
        hsv(): IColorSpaces["hsv"];
    }
}
