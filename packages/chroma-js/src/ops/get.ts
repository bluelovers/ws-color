import Color from '../Color';
import { IInterpolationMode } from '../types';

declare module '../Color'
{
	interface Color
	{
		get<T = number[]>(mc: string | IInterpolationMode): T;
	}
}

Color.prototype.get = function (mc)
{
	const [mode, channel] = mc.split('.');
	const src = this[mode]();
	if (channel)
	{
		const i = mode.indexOf(channel);
		if (i > -1) return src[i];
		throw new Error(`unknown channel ${channel} in mode ${mode}`);
	}
	else
	{
		return src;
	}
}
