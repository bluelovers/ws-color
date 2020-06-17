import Color from '../Color';
const digits = '0123456789abcdef';

const { floor, random } = Math;

declare module '../chroma'
{
	interface chroma
	{
		random(): Color
	}
}

export default () =>
{
	let code = '#';
	for (let i = 0; i < 6; i++)
	{
		code += digits.charAt(floor(random() * 16));
	}
	return new Color(code, 'hex');
}
