declare module '../Color' {
    interface Color {
        /**
         * Set luminance of color. The source color will be interpolated with black or white until the correct luminance is found.
         * The color space used defaults to RGB.
         */
        luminance(lum: number): Color;
        /**
         * Relative brightness, according to the
         * [WCAG]{@link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef} definition. Normalized to
         * 0 for darkest black and 1 for lightest white.
         */
        luminance(): number;
    }
}
export {};
