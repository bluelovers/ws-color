// some pre-defined color scales:
import chroma from '../chroma';
import '../io/hsl';
import scale from '../generator/scale';

const scales = {
	cool() { return scale([chroma.hsl(180, 1, .9), chroma.hsl(250, .7, .4)]) },
	hot() { return scale(['#000', '#f00', '#ff0', '#fff'], [0, .25, .75, 1]).mode('rgb') },
};

declare module '../chroma'
{
	interface chroma
	{
		scales: typeof scales
	}
}

export default scales
