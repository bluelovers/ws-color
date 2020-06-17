import '../utils/limit';
import Color from '../Color';
import { IScale, ICubehelix, IRGB } from '../types';
declare module '../chroma' {
    interface chroma {
        scale: typeof scale;
    }
}
declare function scale<OutType = Color>(colors: ICubehelix | IRGB | Color[] | [string, string, ...string[]], ...argv: IRGB[]): IScale<OutType>;
export default scale;
