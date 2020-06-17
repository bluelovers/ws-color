import Color from './Color';
import { IChromaConstructor } from './types';

export interface chroma extends IChromaConstructor
{
	(...args): Color,
	Color: typeof Color;
	version: string;
	chroma: chroma,
	default: chroma,
}

// @ts-ignore
export const chroma: chroma = (...args) =>
{
	return new chroma.Color(...args);
};

chroma.Color = Color;
chroma.version = '@@version'

chroma.chroma = chroma;
chroma.default = chroma;

Object.defineProperty(chroma, "__esModule", { value: true });

export default chroma;
