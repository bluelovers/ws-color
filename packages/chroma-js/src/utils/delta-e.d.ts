import Color from '../Color';
/**
 * Computes color difference {@link https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_.281984.29} as
 * developed by the Colour Measurement Committee of the Society of Dyers and Colourists (CMC) in 1984.
 * The implementation is adapted from Bruce Lindbloom.
 * {@link https://web.archive.org/web/20160306044036/http://www.brucelindbloom.com/javascript/ColorDiff.js}
 * The parameters L (default 1) and C (default 1) are weighting factors for lightness and chromacity.
 */
declare function deltaE(a: string | Color, b: string | Color, L?: number, C?: number): number;
declare module '../chroma' {
    interface chroma {
        /**
         * Computes color difference {@link https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_.281984.29} as
         * developed by the Colour Measurement Committee of the Society of Dyers and Colourists (CMC) in 1984.
         * The implementation is adapted from Bruce Lindbloom.
         * {@link https://web.archive.org/web/20160306044036/http://www.brucelindbloom.com/javascript/ColorDiff.js}
         * The parameters L (default 1) and C (default 1) are weighting factors for lightness and chromacity.
         */
        deltaE: typeof deltaE;
    }
}
export default deltaE;
