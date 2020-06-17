declare module '../Color' {
    interface Color {
        /**
         * Set the color opacity.
         */
        alpha(a: number, mutate: true): this;
        /**
         * Set the color opacity.
         */
        alpha(a: number, mutate?: boolean): Color;
        /**
         * Get the color opacity.
         */
        alpha(): number;
    }
}
export {};
