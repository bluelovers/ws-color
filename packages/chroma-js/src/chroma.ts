import Color from './Color';
import { IChromaConstructor } from './types/internal';
import colors from './colors/index';

/**
 * Chroma.js is a tiny library for all kinds of color conversions and color scales.
 */
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

// colors
chroma.colors = colors;

chroma.Color = Color;
chroma.version = '@@version'

chroma.chroma = chroma;
chroma.default = chroma;

Object.defineProperty(chroma, "__esModule", { value: true });

export default chroma;
