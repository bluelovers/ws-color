import Color from '../../Color';
import temperature2rgb from './temperature2rgb';
declare module '../../Color' {
    interface Color {
        temp(): number;
        kelvin(): number;
        temperature(): number;
    }
}
declare module '../../chroma' {
    interface chroma {
        temp(...args: any[]): Color;
        kelvin(...args: any[]): Color;
        temperature(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        temp: typeof temperature2rgb;
        kelvin: typeof temperature2rgb;
        temperature: typeof temperature2rgb;
    }
}
