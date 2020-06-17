import '../io/lch';
declare module '../Color' {
    interface Color {
        /**
         * Changes the saturation of a color by manipulating the Lch chromacity.
         */
        saturate(amount: number): Color;
        /**
         * Similar to saturate, but the opposite direction.
         */
        desaturate(amount: number): Color;
    }
}
