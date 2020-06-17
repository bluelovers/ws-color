import '../io/hcg';
declare const hcg: (col1: any, col2: any, f: any) => Color;
declare module './index' {
    interface IInterpolator {
        hcg(col1: Color, col2: Color, f?: number): Color;
    }
}
import Color from '../Color';
export default hcg;
