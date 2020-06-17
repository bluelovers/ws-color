import { IOptionsRand } from '../utils/rand';
import { IColorSpaces } from '../types';
import '../io/rgb';
declare module '../Color' {
    interface Color {
        rand(options?: IOptionsRand): IColorSpaces["rgba"];
    }
}
