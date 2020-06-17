import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputFormat } from '../input';
import rgb2temperature from './rgb2temperature';

import temperature2rgb from './temperature2rgb';

declare module '../../Color'
{
	interface Color
	{
		temp(): number;
		kelvin(): number;
		temperature(): number;
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		temp(...args): Color
		kelvin(...args): Color
		temperature(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		temp: typeof temperature2rgb;
		kelvin: typeof temperature2rgb;
		temperature: typeof temperature2rgb;
	}
}

/*
Color.prototype.temp =
	Color.prototype.kelvin =
		Color.prototype.temperature = function ()
		{
			return rgb2temperature(this._rgb);
		};

chroma.temp =
	chroma.kelvin =
		chroma.temperature = (...args) => new Color(...args, 'temp');

input.format.temp =
	input.format.kelvin =
		input.format.temperature = temperature2rgb;
*/

([
	'temp',
	'kelvin',
	'temperature',
] as const)
	.forEach(field => {

		Color.prototype[field] = function ()
		{
			return rgb2temperature(this._rgb);
		};

		chroma[field] = (...args) => new Color(...args, 'temp');

		setupInputFormat(field, temperature2rgb)

	})
;

