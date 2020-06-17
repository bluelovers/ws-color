import colorbrewer from 'color-palette/lib/colorbrewer';
import { IColorBrewer } from 'color-palette/lib/colorbrewer';

export type { IColorBrewer }

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * chroma.brewer is an map of ColorBrewer scales that are included in chroma.js for convenience.
		 * chroma.scale uses the colors to construct.
		 */
		brewer: IColorBrewer
	}
}

export default colorbrewer;
