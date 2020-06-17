import unpack from '../../utils/unpack';
import lch2lab from './lch2lab';
import lab2rgb from '../lab/lab2rgb';
import { IColorSpaces } from '../../types';

const lch2rgb = (...args): IColorSpaces["rgba"] =>
{
	args = unpack(args, 'lch');
	const [l, c, h] = args;
	const [L, a, b_] = lch2lab(l, c, h);
	const [r, g, b] = lab2rgb(L, a, b_);
	return [r, g, b, args.length > 3 ? args[3] : 1];
}

export default lch2rgb;
