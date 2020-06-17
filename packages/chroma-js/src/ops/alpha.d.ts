declare module '../Color' {
    interface Color {
        alpha(a: number, mutate: true): this;
        alpha(a: number, mutate?: boolean): Color;
        alpha(): number;
    }
}
export {};
