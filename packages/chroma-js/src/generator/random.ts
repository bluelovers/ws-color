
import Color from '../Color';
import { randomHex, IOptionsRand } from '../utils/rand';
import colors from '../colors';

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Returns a random color.
		 */
		random(options?: IOptionsRand): Color
	}
}

export default (options?: IOptionsRand) =>
{
	if (options?.rgba)
	{
		return new Color(colors._default, 'rgba');
	}

	let code = '#' + randomHex(options);
	return new Color(code, 'hex');
}
