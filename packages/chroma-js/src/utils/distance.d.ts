import Color from '../Color';
import { IInterpolationMode } from '../types';
/**
 * simple Euclidean distance
 *
 * Computes the eucledian distance between two colors in a given color space (default is 'lab').
 * {@link https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions}
 */
declare function distance(a: string | Color, b: string | Color, mode?: IInterpolationMode): number;
declare module '../chroma' {
    interface chroma {
        /**
         * Computes the eucledian distance between two colors in a given color space (default is 'lab').
         * {@link https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions}
         */
        distance: typeof distance;
    }
}
export default distance;
