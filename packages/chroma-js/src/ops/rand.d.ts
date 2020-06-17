import { IOptionsRand } from '../utils/rand';
import { IColorSpaces, IRGBValue } from '../types';
import '../io/rgb';
declare module '../Color' {
    interface Color {
        rand(rgba?: IRGBValue, options?: IOptionsRand): IColorSpaces["rgba"];
    }
}
