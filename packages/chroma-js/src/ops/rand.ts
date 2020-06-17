import Color from '../Color';
import rand, { IRGBValue, IOptionsRand } from '../utils/rand';
import { IColorSpaces } from '../types';
import '../io/rgb';
import colors from '../colors';

declare module '../Color'
{
	interface Color
	{
		rand(rgba?: IRGBValue, options?: IOptionsRand): IColorSpaces["rgba"];
	}
}

// @ts-ignore
Color.prototype.rand = function (options?: IOptionsRand)
{
	return new Color(rand(this._rgb, options), 'rgba');
}

console.log(new Color().toString())
