import { IInterpolationMode } from '../types';
declare module '../Color' {
    interface Color {
        set<T extends Color | ReturnType<Color[IInterpolationMode]> = ReturnType<Color[IInterpolationMode]>>(mc: string, value?: string | number, mutate?: boolean): T;
    }
}
