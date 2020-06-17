import Color from '../Color';
import '../io/lab';
import { IScale } from './scale';
declare module '../chroma' {
    interface chroma {
        bezier: typeof bezier;
    }
}
export interface IBezier {
    (t: number): Color;
    scale(): IScale;
}
declare const bezier: (colors: string[]) => IBezier;
export default bezier;
