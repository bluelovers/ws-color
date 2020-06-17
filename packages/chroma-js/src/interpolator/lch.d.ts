import '../io/lch';
declare const lch: (col1: any, col2: any, f: any) => Color;
declare module './index' {
    interface IInterpolator {
        lch(col1: Color, col2: Color, f?: number): Color;
        hcl(col1: Color, col2: Color, f?: number): Color;
    }
}
import Color from '../Color';
export default lch;
