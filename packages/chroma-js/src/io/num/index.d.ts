import Color from '../../Color';
import num2rgb from './num2rgb';
declare module '../../Color' {
    interface Color {
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
