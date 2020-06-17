import chroma from '../chroma';

export function limit(x: number, min = 0, max = 1)
{
	return x < min ? min : x > max ? max : x;
}

declare module '../chroma'
{
	interface chroma
	{
		limit(x: number, min?: number, max?: number): number
	}
}

export default limit
