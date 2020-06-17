import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the `hue`, `saturation`, and `lightness`
         * component. Hue is the color angle in degree (`0..360`), saturation
         * and lightness are within `0..1`. Note that for hue-less colors
         * (black, white, and grays), the hue component will be NaN.
         *
         * @example
         * chroma('orange').hsl() === [38.82,1,0.5,1]
         * chroma('white').hsl() === [NaN,0,1,1]
         */
        hsl(): IColorSpaces["hsl"];
    }
}
