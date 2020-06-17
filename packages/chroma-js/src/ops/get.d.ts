import { IInterpolationMode } from '../types';
declare module '../Color' {
    interface Color {
        /**
         * Returns a single channel value.
         * @see set
         */
        get<T extends number | number[] = number[]>(mc: string | IInterpolationMode): T;
    }
}
