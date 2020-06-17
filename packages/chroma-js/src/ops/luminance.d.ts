declare module '../Color' {
    interface Color {
        luminance(lum: number): Color;
        luminance(): number;
    }
}
export {};
