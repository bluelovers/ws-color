import { IRGB } from '../types';
export interface IReturnTypeAutodetect {
    args: any;
    _rgb: IRGB;
    mode: "temp" | "kelvin" | "temperature" | "css" | "named" | "num" | "hcg" | "hsi" | "cmyk" | "hex" | "lab" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "lch" | "lrgb" | "hcl" | "gl";
    autodetect: boolean;
}
export declare function autodetect(args: any): IReturnTypeAutodetect;
export declare function assertAutodetectReturn(ret: IReturnTypeAutodetect): asserts ret is IReturnTypeAutodetect;
export default autodetect;
