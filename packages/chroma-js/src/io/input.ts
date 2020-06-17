import { IColorSpaces, IColorSpacesExtra } from '../types';
import Color from '../Color';
import lab2rgb from './lab/lab2rgb';
import { IRgb2HexMode } from './hex/rgb2hex';

export interface IColorInputObject
{
	format: IColorInputObjectFormat,
	autodetect: IColorInputObjectAutodetect[],
	sorted?: boolean,
}

export interface IColorInputObjectAutodetect
{
	test(...argv): keyof IColorSpaces | keyof IColorSpacesExtra
	p: number,
}

export const input: IColorInputObject = {
	format: {} as IColorInputObjectFormat,
	autodetect: [] as IColorInputObjectAutodetect[],
}

type IColorExtendsColorSpaces = {
	[k in keyof IColorSpaces]: () => IColorSpaces[k];
}

type IFormatExtendsColorSpaces = {
	[k in keyof IColorSpaces]: (...args: any[]) => IColorSpaces["rgba"]
}

export interface IColorInputObjectFormat extends IFormatExtendsColorSpaces
{

}

declare module '../Color'
{
	interface Color extends IColorExtendsColorSpaces
	{

	}
}

declare module '../chroma'
{
	interface chroma extends Record<keyof IColorSpaces, (...args) => Color>
	{

	}
}

export default input
