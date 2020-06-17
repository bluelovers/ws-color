import unpack from '../../utils/unpack';
import lch2rgb from './lch2rgb';

const hcl2rgb = (...args) =>
{
	const hcl = unpack(args, 'hcl').reverse();
	return lch2rgb(...hcl);
}

export default hcl2rgb;
