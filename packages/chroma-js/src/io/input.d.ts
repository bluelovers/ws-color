import { IColorSpaces, IColorSpacesExtra, IInterpolationMode } from '../types';
import Color from '../Color';
export interface IColorInputObject {
    format: IColorInputObjectFormat;
    autodetect: IColorInputObjectAutodetect[];
    sorted?: boolean;
}
export interface IColorInputObjectAutodetect {
    test(...argv: any[]): keyof IColorSpaces | keyof IColorSpacesExtra | IInterpolationMode;
    p: number;
}
export declare const input: IColorInputObject;
type IColorExtendsColorSpaces = {
    [k in keyof IColorSpaces]: () => IColorSpaces[k];
} & {
    [k in keyof IColorSpacesExtra]: () => IColorSpacesExtra[k];
};
type IFormatExtendsColorSpaces = {
    [k in keyof IColorSpaces]: (...args: any[]) => IColorSpaces["rgba"];
} & {
    [k in Exclude<keyof IColorSpacesExtra, keyof Color>]: (...args: any[]) => IColorSpaces["rgba"];
};
export interface IColorInputObjectFormat extends IFormatExtendsColorSpaces {
}
declare module '../Color' {
    interface Color extends IColorExtendsColorSpaces {
    }
}
declare module '../chroma' {
    interface chroma extends Record<keyof IColorSpaces, (...args: any[]) => Color> {
    }
}
export declare function setupInputFormat<K extends keyof IColorInputObjectFormat>(fields: K | K[], conf: IColorInputObjectFormat[K]): asserts conf is IColorInputObjectFormat[K];
export declare function setupInputAutodetect(conf: IColorInputObjectAutodetect): asserts conf is IColorInputObjectAutodetect;
export default input;
