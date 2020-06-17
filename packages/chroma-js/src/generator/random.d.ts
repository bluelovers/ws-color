import Color from '../Color';
import { IOptionsRand } from '../utils/rand';
declare module '../chroma' {
    interface chroma {
        random(options?: IOptionsRand): Color;
    }
}
declare const _default_1: (options?: IOptionsRand) => Color;
export default _default_1;
