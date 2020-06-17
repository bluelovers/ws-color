import Color from '../Color';
import '../ops/luminance';

function contrast(a, b)
{
	// WCAG contrast ratio
	// see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
	a = new Color(a);
	b = new Color(b);
	const l1 = a.luminance();
	const l2 = b.luminance();
	return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}

declare module '../chroma'
{
	interface chroma
	{
		contrast: typeof contrast
	}
}

export default contrast
