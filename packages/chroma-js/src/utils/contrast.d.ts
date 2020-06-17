import Color from '../Color';
import '../ops/luminance';
declare function contrast(a: string | Color, b: string | Color): number;
declare module '../chroma' {
    interface chroma {
        /**
         * Computes the WCAG contrast ratio between two colors.
         * A minimum contrast of 4.5:1 is recommended {@link https://www.w3.org/TR/WCAG20-TECHS/G18.html}
         * to ensure that text is still readable against a background color.
         */
        contrast: typeof contrast;
    }
}
export default contrast;
