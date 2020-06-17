import { IInterpolationMode } from '../types';
declare module '../Color' {
    interface Color {
        get<T extends number | number[] = number[]>(mc: string | IInterpolationMode): T;
    }
}
