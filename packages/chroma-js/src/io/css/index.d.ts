import Color from '../../Color';
import css2rgb from './css2rgb';
import { IRgb2CssMode } from './rgb2css';
declare module '../../Color' {
    interface Color {
        /**
         * Returns a RGB() or HSL() string representation that can be used as CSS-color definition.
         * mode defaults to <code>'rgb'</code>
         */
        css(mode?: IRgb2CssMode): string;
    }
}
declare module '../../chroma' {
    interface chroma {
        css(col: string): Color;
        css(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        css: typeof css2rgb;
    }
}
