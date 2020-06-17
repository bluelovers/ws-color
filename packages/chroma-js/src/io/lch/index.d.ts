import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the **Lightness**, **chroma**, and **hue**
         * components.
         *
         * @example
         * chroma('skyblue').lch() === [79.21,25.94,235.11]
         */
        lch(): IColorSpaces["lch"];
        /**
         * Alias of [lch](#color-lch), but with the components in reverse
         * order.
         *
         * @example
         * chroma('skyblue').hcl() === [235.11,25.94,79.21]
         */
        hcl(): IColorSpaces["hcl"];
    }
}
