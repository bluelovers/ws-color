import '../io/lab';
declare module '../Color' {
    interface Color {
        darken(amount?: number | -1): Color;
        brighten(amount?: number | 1): Color;
        darker(amount?: number | -1): Color;
        brighter(amount?: number | 1): Color;
    }
}
