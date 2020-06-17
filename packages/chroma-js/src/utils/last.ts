import type from './type';

export default <T extends string>(args: any[] | [any, T] | [any, any, T] | [any, any, any, T] | [any, any, any, any, T]): T =>
{
	if (args.length > 1)
	{
		return args[args.length - 1]?.toLowerCase?.()
	}
};
