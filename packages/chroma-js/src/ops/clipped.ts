import Color from '../Color';

declare module '../Color'
{
	interface Color
	{
		clipped(): boolean;
	}
}

Color.prototype.clipped = function ()
{
	return this._rgb._clipped || false;
}
