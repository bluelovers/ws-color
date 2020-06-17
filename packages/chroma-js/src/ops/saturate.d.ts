import '../io/lch';
declare module '../Color' {
    interface Color {
        saturate(amount: number): Color;
        desaturate(amount: number): Color;
    }
}
