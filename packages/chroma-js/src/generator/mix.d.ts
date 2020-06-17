import Color from '../Color';
import { IInterpolatorMode } from '../interpolator';
declare module '../chroma' {
    interface chroma {
        /**
         * Mixes two colors. The mix ratio is a value between 0 and 1.
         * The color mixing produces different results based the color space used for interpolation.
         * @example chroma.mix('red', 'blue', 0.25) // => #bf0040
         * @example chroma.mix('red', 'blue', 0.5, 'hsl') // => #ff00ff
         */
        mix(col1: Color, col2: Color, f?: number, mode?: IInterpolatorMode): Color;
        /**
         * Mixes two colors. The mix ratio is a value between 0 and 1.
         * The color mixing produces different results based the color space used for interpolation.
         * @example chroma.mix('red', 'blue', 0.25) // => #bf0040
         * @example chroma.mix('red', 'blue', 0.5, 'hsl') // => #ff00ff
         */
        mix(col1: string | Color, col2: string | Color, f?: number, mode?: IInterpolatorMode): Color;
        /**
         * Alias for {@see mix}.
         */
        interpolate(col1: Color, col2: Color, f?: number, mode?: IInterpolatorMode): Color;
    }
}
declare const mix: (col1: Color, col2: Color, f: number, rest_0: string | number) => Color;
export default mix;
