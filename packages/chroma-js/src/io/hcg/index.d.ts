import Color from '../../Color';
import { IColorSpaces } from '../../types';
import hcg2rgb from './hcg2rgb';
declare module '../../Color' {
    interface Color {
        hcg(): IColorSpaces["hcg"];
    }
}
declare module '../../chroma' {
    interface chroma {
        hcg(...args: any[]): Color;
    }
}
declare module '../input' {
    interface IColorInputObjectFormat {
        hcg: typeof hcg2rgb;
    }
}
