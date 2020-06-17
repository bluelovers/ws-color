import Color from '../Color';
import { IInterpolationMode } from '../types';
declare module '../chroma' {
    interface chroma {
        /**
         * Similar to {@link mix}, but accepts more than two colors. Simple averaging of R,G,B components and the alpha
         * channel.
         */
        average: typeof average;
    }
}
/**
 * Similar to {@link mix}, but accepts more than two colors. Simple averaging of R,G,B components and the alpha
 * channel.
 */
declare function average(colors: (string | Color)[], mode?: IInterpolationMode, weights?: number[]): Color;
export default average;
