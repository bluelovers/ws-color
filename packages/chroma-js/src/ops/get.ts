import Color from '../Color';
import { IInterpolationMode } from '../types';
import splitModeChannel from '../utils/mode-channel-split';

declare module '../Color'
{
	interface Color
	{
		get<T extends number | number[] = number[]>(mc: string | IInterpolationMode): T;
	}
}

// @ts-ignore
Color.prototype.get = function (mc)
{
	const [mode, channel, i] = splitModeChannel(mc)

	const src = this[mode]();

	if (channel)
	{
		if (i > -1) return src[i];

		throw new Error(`unknown channel ${channel} in mode ${mode}`);
	}
	else
	{
		return src;
	}
}
