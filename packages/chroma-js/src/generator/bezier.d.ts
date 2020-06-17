import Color from '../Color';
import '../io/lab';
import { IScale } from '../types';
declare module '../chroma' {
    interface chroma {
        /**
         * Returns a function that
         * [bezier-interpolates]{@link https://www.vis4.net/blog/posts/mastering-multi-hued-color-scales/} between
         * colors in Lab space. The input range of the function is [0..1].
         * You can convert it to a scale instance by calling <code>chroma.bezier(...).scale()</code>
         */
        bezier: typeof bezier;
    }
}
export interface IBezier {
    (t: number): Color;
    scale(): IScale;
}
/**
 * Returns a function that
 * [bezier-interpolates]{@link https://www.vis4.net/blog/posts/mastering-multi-hued-color-scales/} between
 * colors in Lab space. The input range of the function is [0..1].
 * You can convert it to a scale instance by calling <code>chroma.bezier(...).scale()</code>
 */
declare function bezier(colors: (string | Color)[]): IBezier;
export default bezier;
