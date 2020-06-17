import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';


import rgb2css from './rgb2css';
import css2rgb from './css2rgb';
import { IRgb2HexMode } from '../hex/rgb2hex';
import hex2rgb from '../hex/hex2rgb';
import { IRgb2CssMode } from './rgb2css';

declare module '../../Color'
{

	interface Color
	{
		css(mode?: IRgb2CssMode): string;
	}

}

declare module '../../chroma'
{
	interface chroma
	{
		css(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		css: typeof css2rgb
	}
}

Color.prototype.css = function (mode)
{
	return rgb2css(this._rgb, mode);
};

chroma.css = (...args) => new Color(...args, 'css');

input.format.css = css2rgb;

setupInputAutodetect({
	p: 5,
	test: (h, ...rest) =>
	{
		if (!rest.length && typeof h === 'string' && css2rgb.test(h))
		{
			return 'css';
		}
	},
})


