import Color from '../../Color';
import num2rgb from './num2rgb';
declare module '../../Color' {
    interface Color {
        /**
         * Returns the numeric representation of the hexadecimal RGB color.
         *
         * @example
         * chroma('#000000').num() === 0
         * chroma('#0000ff').num() === 255
         * chroma('#00ff00').num() === 65280
         * chroma('#ff0000').num() === 16711680
         */
        num(): number;
    }
}
declare module '../../chroma' {
    interface chroma {
        num(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        num: typeof num2rgb;
    }
}
