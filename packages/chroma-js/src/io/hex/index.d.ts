import Color from '../../Color';
import hex2rgb from './hex2rgb';
import { IRgb2HexMode } from './rgb2hex';
declare module '../../Color' {
    interface Color {
        hex?(mode?: IRgb2HexMode): string;
    }
}
declare module '../../chroma' {
    interface chroma {
        hex(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        hex: typeof hex2rgb;
    }
}
