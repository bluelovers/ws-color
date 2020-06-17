import '../io/num';
import Color from '../Color';
declare const num: (col1: any, col2: any, f: any) => Color;
declare module './index' {
    interface IInterpolator {
        num(col1: Color, col2: Color, f?: number): Color;
    }
}
export default num;
