import Color from '../Color';
declare const rgb: (col1: any, col2: any, f: any) => Color;
declare module './index' {
    interface IInterpolator {
        rgb(col1: Color, col2: Color, f?: number): Color;
    }
}
export default rgb;
