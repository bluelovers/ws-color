import { IRGBValue, IOptionsRand } from '../utils/rand';
import { IColorSpaces } from '../types';
import '../io/rgb';
declare module '../Color' {
    interface Color {
        rand(rgba?: IRGBValue, options?: IOptionsRand): IColorSpaces["rgba"];
    }
}
