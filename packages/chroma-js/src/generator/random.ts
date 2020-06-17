
import Color from '../Color';
import rand, { randomHex, IOptionsRand } from '../utils/rand';
import chroma from '../chroma';

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Returns a random color.
		 */
		random(options?: IOptionsRand | IOptionsRand["rgba"]): Color
		rand(options?: IOptionsRand | IOptionsRand["rgba"]): Color
	}
}

export function random(options?: IOptionsRand | IOptionsRand["rgba"])
{
	if (options instanceof Color || Array.isArray(options) || typeof options === 'string' || typeof options !== 'object')
	{
		// @ts-ignore
		options = {
			rgba: options,
		}
	}

	// @ts-ignore
	if (options?.rgba)
	{
		return new Color(rand(options), 'rgba');
	}

	let code = '#' + randomHex(options);
	return new Color(code, 'hex');
}

chroma.random = chroma.rand = random;

export default random
