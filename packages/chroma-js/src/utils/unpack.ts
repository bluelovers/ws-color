import type from './type';
import { IColorSpaces } from '../types';

export default <K extends keyof IColorSpaces>(args: any[], keyOrder?: K): IColorSpaces[K] =>
{
	// if called with more than 3 arguments, we return the arguments
	if (args.length >= 3) return Array.prototype.slice.call(args) as any;
	// with less than 3 args we check if first arg is object
	// and use the keyOrder string to extract and sort properties
	if (type(args[0]) == 'object' && keyOrder)
	{
		return keyOrder.split('')
			.filter(k => args[0][k] !== undefined)
			.map(k => args[0][k]) as any;
	}
	// otherwise we just return the first argument
	// (which we suppose is an array of args)
	return args[0] as any;
};
