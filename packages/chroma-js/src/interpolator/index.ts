import Color from '../Color';
import { IColorSpaces } from '../types';

export interface IInterpolator
{
	[fn: string]: (col1: Color, col2: Color, f?: number) => Color
}

export type IInterpolatorMode = keyof IInterpolator

export default {} as IInterpolator;
