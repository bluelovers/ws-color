/**
 * Created by user on 2020/6/17.
 */
import { IInterpolationMode } from '../types';

function splitModeChannel<T extends IInterpolationMode>(mc: string): [T, string, number | -1]
{
	const [mode, channel] = mc.split('.');

	let index: number | -1 = -1;

	if (channel)
	{
		index = mode.indexOf(channel);
	}

	return [mode as T, channel, index]
}

export default splitModeChannel;
