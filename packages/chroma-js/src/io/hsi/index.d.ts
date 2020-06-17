import Color from '../../Color';
import hsi2rgb from './hsi2rgb';
import { IColorSpaces } from '../../types';
declare module '../../Color' {
    interface Color {
        hsi(): IColorSpaces["hsi"];
    }
}
declare module '../../chroma' {
    interface chroma {
        hsi(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        hsi: typeof hsi2rgb;
    }
}
