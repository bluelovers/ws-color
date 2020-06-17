import Color from '../Color';
import rand, { IOptionsRand } from '../utils/rand';
import { IColorSpaces, IRGBValue } from '../types';
import '../io/rgb';
import colors from '../colors';

declare module '../Color'
{
	interface Color
	{
		rand(options?: IOptionsRand): IColorSpaces["rgba"];
	}
}

// @ts-ignore
Color.prototype.rand = function (options: IOptionsRand = {})
{
	options.rgba = this._rgb

	return new Color(rand(options), 'rgba');
}
