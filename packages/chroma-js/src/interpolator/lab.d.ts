import '../io/lab';
import Color from '../Color';
declare module './index' {
    interface IInterpolator {
        lab(col1: Color, col2: Color, f?: number): Color;
    }
}
declare const lab: (col1: Color, col2: Color, f?: number) => Color;
export default lab;
