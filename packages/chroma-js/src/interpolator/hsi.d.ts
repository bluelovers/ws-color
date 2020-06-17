import '../io/hsi';
declare const hsi: (col1: any, col2: any, f: any) => Color;
declare module './index' {
    interface IInterpolator {
        hsi(col1: Color, col2: Color, f?: number): Color;
    }
}
import Color from '../Color';
export default hsi;
