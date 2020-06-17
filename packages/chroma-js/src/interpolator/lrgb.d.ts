import Color from '../Color';
declare module './index' {
    interface IInterpolator {
        lrgb(col1: Color, col2: Color, f?: number): Color;
    }
}
export declare const lrgb: (col1: Color, col2: Color, f: number) => Color;
export default lrgb;
