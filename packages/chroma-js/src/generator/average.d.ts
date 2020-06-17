import Color from '../Color';
import { IInterpolationMode } from '../types';
declare module '../chroma' {
    interface chroma {
        average: typeof average;
    }
}
declare function average(colors: (string | Color)[], mode?: IInterpolationMode, weights?: number[]): Color;
export default average;
