import chroma from '../';

test(`pink.darken.saturate`, () =>
{

	let actual = chroma('pink').darken().saturate(2);

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

});

test(`rand`, () =>
{

	let actual = chroma().rand();

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	console.dir(actual)
	expect(actual).toBeTruthy();

});

test(`empty`, () =>
{

	let actual = chroma();

	//expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);

	expect(actual.toString()).toMatchSnapshot();
	expect(actual).toMatchSnapshot();

});
