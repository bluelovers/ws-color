import Color from '../Color';
import splitModeChannel from '../utils/mode-channel-split';
import { IInterpolationMode } from '../types';

declare module '../Color'
{
	interface Color
	{
		set<T extends Color | ReturnType<Color[IInterpolationMode]> = ReturnType<Color[IInterpolationMode]>>(mc: string, value?: string | number, mutate?: boolean): T;
	}
}

// @ts-ignore
Color.prototype.set = function (mc, value, mutate = false)
{
	const [mode, channel, i] = splitModeChannel(mc)

	const src = this[mode]();
	if (channel)
	{
		if (i > -1)
		{
			if (typeof value === 'string')
			{
				switch (value.charAt(0))
				{
					case '+':
						src[i] += +value;
						break;
					case '-':
						src[i] += +value;
						break;
					case '*':
						src[i] *= +(value.substr(1));
						break;
					case '/':
						src[i] /= +(value.substr(1));
						break;
					default:
						src[i] = +value;
				}
			}
			else if (typeof value === 'number')
			{
				src[i] = value;
			}
			else
			{
				throw new Error(`unsupported value for Color.set`);
			}
			const out = new Color(src, mode);
			if (mutate)
			{
				this._rgb = out._rgb;
				return this;
			}
			return out;
		}
		throw new Error(`unknown channel ${channel} in mode ${mode}`);
	}
	else
	{
		return src;
	}
}
