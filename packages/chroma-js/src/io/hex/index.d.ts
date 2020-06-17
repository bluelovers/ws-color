import Color from '../../Color';
import hex2rgb from './hex2rgb';
import { IRgb2HexMode } from './rgb2hex';
declare module '../../Color' {
    interface Color {
        /**
         * Get color as hexadecimal string.
         *
         * @param mode `auto` - string will include alpha channel only if it's less than 1.
         *             `rgb`  - string will not include alpha channel.
         *             `rgba` - string will include alpha channel.
         *
         * @example
         * chroma('orange').hex() === '#ffa500'
         * chroma('orange').alpha(0.5).hex() === '#ffa50080'
         * chroma('orange').alpha(0.5).hex('rgb') === '#ffa500'
         */
        hex(mode?: IRgb2HexMode): string;
    }
}
declare module '../../chroma' {
    interface chroma {
        /**
         * Create a color from a hex or string representation (as supported in CSS).
         *
         * This is an alias of chroma.css().
         *
         * @param color The string to convert to a color.
         * @return the color object.
         */
        hex(color: string): Color;
        hex(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        hex: typeof hex2rgb;
    }
}
