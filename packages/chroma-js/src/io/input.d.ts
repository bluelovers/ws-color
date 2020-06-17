import { IColorSpaces, IColorSpacesExtra } from '../types';
import Color from '../Color';
export interface IColorInputObject {
    format: IColorInputObjectFormat;
    autodetect: IColorInputObjectAutodetect[];
    sorted?: boolean;
}
export interface IColorInputObjectAutodetect {
    test(...argv: any[]): keyof IColorSpaces | keyof IColorSpacesExtra;
    p: number;
}
export declare const input: IColorInputObject;
declare type IColorExtendsColorSpaces = {
    [k in keyof IColorSpaces]: () => IColorSpaces[k];
};
declare type IFormatExtendsColorSpaces = {
    [k in keyof IColorSpaces]: (...args: any[]) => IColorSpaces["rgba"];
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
export default input;
