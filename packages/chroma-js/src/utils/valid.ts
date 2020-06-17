import Color from '../Color';

function valid(...args)
{
	try
	{
		new Color(...args);
		return true;
	}
	catch (e)
	{
		return false;
	}
};

declare module '../chroma'
{
	interface chroma
	{
		valid: typeof valid
	}
}

export default valid
