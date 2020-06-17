import Color from '../Color';

function arr2colors(colors: (string | Color)[], ...argv): Color[]
{
	return colors.map(c => new Color(c, ...argv));
}

export default arr2colors;
