import Color from '../Color';


declare module '../Color'
{
	interface Color
	{
		/**
		 * Set the color opacity.
		 */
		alpha(a: number, mutate: true): this
		/**
		 * Set the color opacity.
		 */
		alpha(a: number, mutate?: boolean): Color
		/**
		 * Get the color opacity.
		 */
		alpha(): number
	}
}

// @ts-ignore
Color.prototype.alpha = function (a?: number | undefined, mutate = false)
{
	if (typeof a === 'number')
	{
		if (mutate)
		{
			this._rgb[3] = a;
			return this;
		}
		return new Color([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
	}
	return this._rgb[3];
}
