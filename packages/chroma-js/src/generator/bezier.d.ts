import Color from '../Color';
import '../io/lab';
import { IScale } from '../types';
declare module '../chroma' {
    interface chroma {
        bezier: typeof bezier;
    }
}
export interface IBezier {
    (t: number): Color;
    scale(): IScale;
}
declare const bezier: (colors: (string | Color)[]) => IBezier;
export default bezier;
