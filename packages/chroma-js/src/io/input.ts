import { IColorSpaces, IColorSpacesExtra, IInterpolationMode } from '../types';
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
	test(...argv): keyof IColorSpaces | keyof IColorSpacesExtra | IInterpolationMode
	p: number,
}

export const input: IColorInputObject = {
	format: {} as IColorInputObjectFormat,
	autodetect: [] as IColorInputObjectAutodetect[],
}

type IColorExtendsColorSpaces = {
	[k in keyof IColorSpaces]: () => IColorSpaces[k];
} & {
	[k in keyof IColorSpacesExtra]: () => IColorSpacesExtra[k];
}

type IFormatExtendsColorSpaces = {
	[k in keyof IColorSpaces]: (...args: any[]) => IColorSpaces["rgba"]
} & {
	[k in Exclude<keyof IColorSpacesExtra, keyof Color>]: (...args: any[]) => IColorSpaces["rgba"]
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

export function setupInputFormat<K extends keyof IColorInputObjectFormat>(fields: K | K[], conf: IColorInputObjectFormat[K]): asserts conf is IColorInputObjectFormat[K]
{
	if (typeof conf !== 'function')
	{
		throw new TypeError(`conf is not allowed format, ${conf}`)
	}

	if (!Array.isArray(fields))
	{
		fields = [fields]
	}

	fields.forEach(field => {

		if (typeof field !== 'string' || !field.length || field in input.format)
		{
			throw new TypeError(`field ${field} is invalid or already exists same field name`)
		}

		input.format[field] = conf;
	})
}

export function setupInputAutodetect(conf: IColorInputObjectAutodetect): asserts conf is IColorInputObjectAutodetect
{
	if (typeof conf?.p !== 'number' || typeof conf?.test !== 'function' || input.autodetect.includes(conf))
	{
		throw new TypeError(`conf is not allowed autodetect, ${conf}`)
	}

	input.autodetect.push(conf)
	input.sorted = false;
}

export default input
