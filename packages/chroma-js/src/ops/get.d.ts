import { IInterpolationMode } from '../types';
declare module '../Color' {
    interface Color {
        get<T = number[]>(mc: string | IInterpolationMode): T;
    }
}
