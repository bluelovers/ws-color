//import { last, clip_rgb, type } from './utils';

import clip_rgb from './utils/clip_rgb';
import last from './utils/last';
import type from './utils/type';

import _input, { IColorInputObjectFormat } from './io/input';
import { IRgb2HexMode } from './io/hex/rgb2hex';
import { IColorSpaces, IRGB, IInterpolationMode } from './types';
import colors from './colors';
import autodetect, { assertAutodetectReturn } from './utils/autodetect';

export class Color
{
	_rgb: IRGB

	//hex?(mode?: IRgb2HexMode): string

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
			this._rgb = colors._empty.slice() as any;

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

		let ret = autodetect(args);

		assertAutodetectReturn(ret);

		me._rgb = ret._rgb
	}

	get [0]()
	{
		return this._rgb[0]
	}

	get [1]()
	{
		return this._rgb[1]
	}

	get [2]()
	{
		return this._rgb[2]
	}

	get [3]()
	{
		return this._rgb[3]
	}

	get length()
	{
		return this._rgb.length
	}

	* [Symbol.iterator]()
	{
		for (let i = 0; i < this._rgb.length; i++)
		{
			yield this._rgb[i]
		}
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
		// @ts-ignore
		if (typeof this.hex === 'function') return this.hex();
		return `[${this._rgb.join(',')}]`;
	}

	clone()
	{
		return new Color(this._rgb.slice())
	}

}

export default Color;
