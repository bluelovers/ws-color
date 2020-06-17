//import { last, clip_rgb, type } from './utils';

import clip_rgb from './utils/clip_rgb';
import last from './utils/last';
import type from './utils/type';

import _input from './io/input';
import { IRgb2HexMode } from './io/hex/rgb2hex';
import { IColorSpaces, IRGB } from './types';

export class Color
{
	_rgb: IRGB

	hex?(mode?: IRgb2HexMode): string

	/**
	 * Creates a color from a string representation (as supported in CSS).
	 * Creates a color from a number representation [0; 16777215]
	 *
	 * @param color The string to convert to a color.
	 * @return the color object.
	 */
	constructor(color: string | number);

	/**
	 * Create a color in the specified color space using a, b and c as values.
	 *
	 * @param colorSpace The color space to use. Defaults to "rgb".
	 * @return the color object.
	 */
	constructor(a: number, b: number, c: number, colorSpace?: keyof IColorSpaces);

	constructor(a: number, b: number, c: number, d: number, colorSpace?: keyof IColorSpaces);

	/**
	 * Create a color in the specified color space using values.
	 *
	 * @param values An array of values (e.g. [r, g, b, a?]).
	 * @param colorSpace The color space to use. Defaults to "rgb".
	 * @return the color object.
	 */
	constructor(values: number[], colorSpace?: keyof IColorSpaces);
	constructor(...args)
	constructor(...args)
	{
		const me = this;

		if (args.length === 0)
		{
			this._rgb = [null, null, null, null];

			return this;
		}

		if (type(args[0]) === 'object' &&
			args[0].constructor &&
			args[0].constructor === this.constructor)
		{
			// the argument is already a Color instance
			return args[0];
		}

		if (args[0] instanceof Color)
		{
			return args[0].clone();
		}

		// last argument could be the mode
		let mode = last(args);
		let autodetect = false;

		if (!mode)
		{
			autodetect = true;
			if (!_input.sorted)
			{
				_input.autodetect = _input.autodetect.sort((a, b) => b.p - a.p);
				_input.sorted = true;
			}
			// auto-detect format
			for (let chk of _input.autodetect)
			{
				mode = chk.test(...args);
				if (mode) break;
			}
		}

		if (_input.format[mode])
		{
			const rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
			me._rgb = clip_rgb(rgb);
		}
		else
		{
			console.dir(_input.format)

			throw new Error('unknown format: ' + args);
		}

		// add alpha channel
		if (me._rgb.length === 3) me._rgb.push(1);
	}

	get _rgba()
	{
		return this._rgb;
	}

	set _rgba(value)
	{
		this._rgb = value;
	}

	toString(): string
	{
		if (typeof this.hex === 'function') return this.hex();
		return `[${this._rgb.join(',')}]`;
	}

	clone()
	{
		return new Color(this._rgb.slice())
	}

}

export default Color;
