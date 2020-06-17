import Color from '../Color';
import '../ops/luminance';

function contrast(a: string | Color, b: string | Color)
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
		/**
		 * Computes the WCAG contrast ratio between two colors.
		 * A minimum contrast of 4.5:1 is recommended {@link https://www.w3.org/TR/WCAG20-TECHS/G18.html}
		 * to ensure that text is still readable against a background color.
		 */
		contrast: typeof contrast
	}
}

export default contrast
