import { IInterpolationMode } from '../types';
declare module '../Color' {
    interface Color {
        /**
         * Changes a single channel and returns the result a new chroma object.
         * @example
         * // half Lab lightness
         * chroma('orangered').set('lab.l', '*0.5')
         * @example
         * // double Lch saturation
         * chroma('darkseagreen').set('lch.c', '*2')
         */
        set<T extends Color | ReturnType<Color[IInterpolationMode]> = ReturnType<Color[IInterpolationMode]>>(mc: string, value?: string | number, mutate?: boolean): T;
    }
}
