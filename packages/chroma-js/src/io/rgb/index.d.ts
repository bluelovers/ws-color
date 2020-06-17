import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the red, green, and blue component, each as
         * number within the range 0..255. Chroma internally stores RGB
         * channels as floats but rounds the numbers before returning them.
         * You can pass false to prevent the rounding.
         *
         * @example
         * chroma('orange').rgb() === [255,165,0]
         * chroma('orange').darken().rgb() === [198,118,0]
         * chroma('orange').darken().rgb(false) === [198.05,118.11,0]
         */
        rgb(round?: boolean): IColorSpaces["rgb"];
        /**
         * Just like color.rgb but adds the alpha channel to the returned array.
         *
         * @example
         * chroma('orange').rgba() === [255,165,0,1]
         * chroma('hsla(20, 100%, 40%, 0.5)').rgba() === [204,68,0,0.5]
         */
        rgba(round?: boolean): IColorSpaces["rgba"];
    }
}
