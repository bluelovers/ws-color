/**
 * Created by user on 2020/6/17.
 */

export interface IColorNames
{
	transparent: [null, null, null, 0],
	_default: string,
	_empty: [null, null, null, 1],
}

declare module '../chroma'
{
	interface chroma
	{
		colors: IColorNames
	}
}

const colors: IColorNames = {
	transparent: [null, null, null, 0],
	_default: "#ffffff",
	_empty: [null, null, null, 1],
} as any

export default colors
