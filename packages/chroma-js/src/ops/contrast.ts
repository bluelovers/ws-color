import Color from '../Color';
import { _contrast002, contrastFront, IOptionsContrastFront } from '../utils/contrast/util';

declare module '../Color'
{

	interface Color
	{
		/**
		 * get contrast color for use as front text color
		 */
		contrastFront(options?: IOptionsContrastFront): Color;
	}
}

Color.prototype.contrastFront = function (options?: IOptionsContrastFront)
{
	return new Color(contrastFront(this.rgba(), options));
}
