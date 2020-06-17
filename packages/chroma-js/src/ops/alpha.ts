import Color from '../Color';


declare module '../Color'
{
	interface Color
	{
		alpha(a: number, mutate: true): this
		alpha(a: number, mutate?: boolean): Color
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
