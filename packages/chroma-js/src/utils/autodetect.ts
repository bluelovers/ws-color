import last from './last';
import _input, { IColorInputObjectFormat } from '../io/input';
import clip_rgb from './clip_rgb';
import { IRGB } from '../types';
import { array_unique_overwrite } from 'array-hyper-unique';

export interface IReturnTypeAutodetect
{
	args: any;
	_rgb: IRGB;
	mode: "temp" | "kelvin" | "temperature" | "css" | "named" | "num" | "hcg" | "hsi" | "cmyk" | "hex" | "lab" | "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "lch" | "lrgb" | "hcl" | "gl";
	autodetect: boolean;
}

export function autodetect(args): IReturnTypeAutodetect
{
	let _rgb: IRGB;

	// last argument could be the mode
	let mode = last<keyof IColorInputObjectFormat>(args);
	let autodetect = false;

	if (!mode?.length)
	{
		if (_input.sorted !== true)
		{
			_input.autodetect = _input.autodetect.sort((a, b) => b.p - a.p);

			//array_unique_overwrite(_input.autodetect);

			_input.sorted = true;
		}
		// auto-detect format
		for (let chk of _input.autodetect)
		{
			let m = chk.test(...args)
			if (typeof m !== 'undefined')
			{
				autodetect = true;
				mode = m;
				break
			}
		}
	}

	if (_input.format[mode])
	{
		// @ts-ignore
		const rgb = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1) as any);

		_rgb = clip_rgb(rgb);

		// add alpha channel
		if (_rgb.length === 3) _rgb.push(1);
	}
	else
	{
		throw new Error(`unknown format: ${args}, mode: ${mode}, autodetect: ${autodetect}`);
	}

	return {
		args,
		_rgb,
		mode,
		autodetect,
	};
}

export function assertAutodetectReturn(ret: IReturnTypeAutodetect): asserts ret is IReturnTypeAutodetect
{
	if (!ret._rgb)
	{
		throw new TypeError(`unknown format: ${ret.args}, mode: ${ret.mode}, autodetect: ${ret.autodetect}, _rgb: ${ret._rgb}`);
	}
}

export default autodetect
