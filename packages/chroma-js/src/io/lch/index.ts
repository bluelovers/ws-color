import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect, setupInputFormat } from '../input';

import rgb2lch from './rgb2lch';

import lch2rgb from './lch2rgb';

import hcl2rgb from './hcl2rgb';

Color.prototype.lch = function () { return rgb2lch(this._rgb); };
Color.prototype.hcl = function () { return rgb2lch(this._rgb).reverse() as any; };

//chroma.lch = (...args) => new Color(...args, 'lch');
//chroma.hcl = (...args) => new Color(...args, 'hcl');

//input.format.lch = lch2rgb;
//input.format.hcl = hcl2rgb;

setupInputFormat('lch', lch2rgb);
setupInputFormat('hcl', hcl2rgb);

(['lch', 'hcl'] as const).forEach(m =>
{
	chroma[m] = (...args) => new Color(...args, m);

	setupInputAutodetect({
		p: 2,
		test: (...args) =>
		{
			args = unpack(args, m);
			if (Array.isArray(args) && args.length === 3)
			{
				return m;
			}
		},
	})

});

