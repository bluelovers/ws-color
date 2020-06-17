import Color from '../Color';

// simple Euclidean distance
function distance(a, b, mode = 'lab')
{
	// Delta E (CIE 1976)
	// see http://www.brucelindbloom.com/index.html?Equations.html
	a = new Color(a);
	b = new Color(b);
	const l1 = a.get(mode);
	const l2 = b.get(mode);
	let sum_sq = 0;
	for (let i in l1)
	{
		const d = (l1[i] || 0) - (l2[i] || 0);
		sum_sq += d * d;
	}
	return Math.sqrt(sum_sq);
};

declare module '../chroma'
{
	interface chroma
	{
		distance: typeof distance
	}
}

export default distance
