import Color from '../../Color';
import css2rgb from './css2rgb';
import { IRgb2CssMode } from './rgb2css';
declare module '../../Color' {
    interface Color {
        css(mode?: IRgb2CssMode): string;
    }
}
declare module '../../chroma' {
    interface chroma {
        css(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        css: typeof css2rgb;
    }
}
