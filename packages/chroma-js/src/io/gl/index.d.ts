import Color from '../../Color';
import { IColorSpaces } from '../../types';
declare module '../../chroma' {
    interface chroma {
        /**
         * GL is a variant of RGB(A), with the only difference that the components are normalized to the range of 0..1.
         */
        gl(red: number, green: number, blue: number, alpha?: number): Color;
        gl(...args: any[]): Color;
    }
}
declare module '../../Color' {
    interface Color {
        /**
         * Returns an array with the cyan, magenta, yellow, and key (black)
         * components, each as a normalized value between 0 and 1.
         *
         * @example
         * chroma('33cc00').gl() === [0.2,0.8,0,1]
         */
        gl(): IColorSpaces["gl"];
    }
}
