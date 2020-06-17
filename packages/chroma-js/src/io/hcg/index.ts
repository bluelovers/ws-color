import unpack from '../../utils/unpack';
import type from '../../utils/type';
import chroma from '../../chroma';
import Color from '../../Color';
import input from '../input';

import rgb2hcg from './rgb2hcg';
import { IColorSpaces } from '../../types';
import lab2rgb from '../lab/lab2rgb';

import hcg2rgb from './hcg2rgb';

declare module '../../Color'
{
	interface Color
	{
		hcg(): IColorSpaces["hcg"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		hcg(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		hcg: typeof hcg2rgb
	}
}

Color.prototype.hcg = function ()
{
	return rgb2hcg(this._rgb);
};

chroma.hcg = (...args) => new Color(...args, 'hcg');

input.format.hcg = hcg2rgb;

input.autodetect.push({
	p: 1,
	test: (...args) =>
	{
		args = unpack(args, 'hcg');
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hcg';
		}
	},
});
