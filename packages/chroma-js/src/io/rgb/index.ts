import chroma from '../../chroma';
import Color from '../../Color';
import input from '../input';
import unpack from '../../utils/unpack';

import { IColorSpaces } from '../../types';
const { round } = Math;

Color.prototype.rgb = function (rnd = true): IColorSpaces["rgb"]
{
	if (rnd === false) return this._rgb.slice(0, 3) as any;
	return this._rgb.slice(0, 3).map(round) as any;
}

Color.prototype.rgba = function (rnd = true): IColorSpaces["rgba"]
{
	return this._rgb.slice(0, 4).map((v, i) =>
	{
		return i < 3 ? (rnd === false ? v : round(v)) : v;
	}) as any;
};

chroma.rgb = (...args) => new Color(...args, 'rgb');

input.format.rgba = input.format.rgb = (...args) =>
{
	const rgba = unpack(args, 'rgba');
	rgba[3] = rgba[3] ?? 1;
	return rgba;
};

input.autodetect.push({
	p: 3,
	test: (...args) =>
	{
		args = unpack(args, 'rgba');
		if (Array.isArray(args) && (args.length === 3 ||
			args.length === 4 && typeof args[3] === 'number' && args[3] >= 0 && args[3] <= 1))
		{
			return 'rgb';
		}
	},
});
