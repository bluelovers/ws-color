import Color from '../Color';
import mix from '../generator/mix';
import { IInterpolator } from '../interpolator';
import { IInterpolatorMode } from '../interpolator';

declare module '../Color'
{
	interface Color
	{
		mix(col2: Color, f: number, mode?: IInterpolatorMode): Color;
		interpolate(col2: Color, f: number, mode?: IInterpolatorMode): Color;
	}
}

Color.prototype.mix =
	Color.prototype.interpolate = function (col2: Color, f = 0.5, ...rest: [IInterpolatorMode])
	{
		return mix(this, col2, f, ...rest);
	}
