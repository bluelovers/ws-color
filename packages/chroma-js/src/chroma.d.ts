import Color from './Color';
import { IChromaConstructor } from './types';
export interface chroma extends IChromaConstructor {
    (...args: any[]): Color;
    Color: typeof Color;
    version: string;
    chroma: chroma;
    default: chroma;
}
export declare const chroma: chroma;
export default chroma;
