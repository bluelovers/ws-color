import Color from './Color';
import { IChromaConstructor } from './types/internal';
/**
 * Chroma.js is a tiny library for all kinds of color conversions and color scales.
 */
export interface chroma extends IChromaConstructor {
    (...args: any[]): Color;
    Color: typeof Color;
    version: string;
    chroma: chroma;
    default: chroma;
}
export declare const chroma: chroma;
export default chroma;
