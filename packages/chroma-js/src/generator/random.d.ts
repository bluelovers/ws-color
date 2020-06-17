import Color from '../Color';
import { IOptionsRand } from '../utils/rand';
declare module '../chroma' {
    interface chroma {
        /**
         * Returns a random color.
         */
        random(options?: IOptionsRand | IOptionsRand["rgba"]): Color;
        rand(options?: IOptionsRand | IOptionsRand["rgba"]): Color;
    }
}
export declare function random(options?: IOptionsRand | IOptionsRand["rgba"]): Color;
export default random;
