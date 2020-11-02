import colors from './index';
import { defaults } from 'lodash';
import { w3cx11, IW3CX11ColorNames } from '@bluelovers/color-palette/lib/w3cx11';

export type { IW3CX11ColorNames }

declare module './index'
{
	interface IColorNames extends IW3CX11ColorNames
	{

	}
}

defaults(colors, w3cx11)

export default w3cx11;
