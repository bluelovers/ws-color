import Color from '../Color';
import { IInterpolatorMode } from '../interpolator';
declare module '../chroma' {
    interface chroma {
        mix(col1: Color, col2: Color, f?: number, mode?: IInterpolatorMode): Color;
        interpolate(col1: Color, col2: Color, f?: number, mode?: IInterpolatorMode): Color;
    }
}
declare const mix: (col1: Color, col2: Color, f: number, rest_0: string | number) => Color;
export default mix;
