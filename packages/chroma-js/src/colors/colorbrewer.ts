import colorbrewer from 'color-palette/lib/colorbrewer';
import { IColorBrewer } from 'color-palette/lib/colorbrewer';

export type { IColorBrewer }

declare module '../chroma'
{
	interface chroma
	{
		brewer: IColorBrewer
	}
}

export default colorbrewer;
