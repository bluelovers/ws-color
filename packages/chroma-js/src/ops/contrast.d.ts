import { IOptionsContrastFront } from '../utils/contrast/util';
declare module '../Color' {
    interface Color {
        /**
         * get contrast color for use as front text color
         */
        contrastFront(options?: IOptionsContrastFront): Color;
    }
}
