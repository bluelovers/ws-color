import { IInterpolatorMode } from '../interpolator';
declare module '../Color' {
    interface Color {
        mix(col2: Color, f: number, mode?: IInterpolatorMode): Color;
        interpolate(col2: Color, f: number, mode?: IInterpolatorMode): Color;
    }
}
